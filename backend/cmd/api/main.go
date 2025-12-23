package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/othersidedrl/portfolio/backend/internal/about"
	"github.com/othersidedrl/portfolio/backend/internal/auth"
	"github.com/othersidedrl/portfolio/backend/internal/config"
	"github.com/othersidedrl/portfolio/backend/internal/database"
	"github.com/othersidedrl/portfolio/backend/internal/hero"
	"github.com/othersidedrl/portfolio/backend/internal/image"
	"github.com/othersidedrl/portfolio/backend/internal/logger"
	"github.com/othersidedrl/portfolio/backend/internal/project"
	"github.com/othersidedrl/portfolio/backend/internal/server"
	"github.com/othersidedrl/portfolio/backend/internal/testimony"
	"github.com/othersidedrl/portfolio/backend/internal/utils"
)

func main() {
	// 1. Load Configuration
	cfg, err := config.Load()
	if err != nil {
		panic("Failed to load configuration: " + err.Error())
	}

	// 2. Initialize Logger
	logger.Init()
	logger.Info("Starting application...")

	// 3. Connect to Database (AutoMigrate running here)
	db := database.ConnectDB(cfg)

	// 4. Initialize Redis
	utils.InitRedis(cfg)

	// 5. Initialize Services
	// Utils
	jwtService := utils.NewJWTService(cfg.JWTSecret)

	// Auth
	authService := auth.NewService(jwtService, cfg)
	authHandler := auth.NewHandler(authService)

	// Hero
	heroRepo := hero.NewGormHeroRepository(db)
	heroService := hero.NewService(heroRepo)
	heroHandler := hero.NewHandler(heroService)

	// About
	aboutRepo := about.NewGormAboutRepository(db)
	aboutService := about.NewService(aboutRepo)
	aboutHandler := about.NewHandler(aboutService)

	// Testimony
	testimonyRepo := testimony.NewGormTestimonyRepository(db)
	testimonyService := testimony.NewService(testimonyRepo, cfg)
	testimonyHandler := testimony.NewHandler(testimonyService)

	// Project
	projectRepo := project.NewGormProjectRepository(db)
	projectService := project.NewService(projectRepo)
	projectHandler := project.NewHandler(projectService)

	// Image
	imageService, err := image.NewService(cfg)
	if err != nil {
		logger.Error("Failed to initialize Image Service", "error", err)
		os.Exit(1)
	}
	imageHandler := image.NewHandler(imageService)

	// 6. Setup Router & Server
	router := server.NewRouter(cfg, authHandler, heroHandler, aboutHandler, testimonyHandler, projectHandler, imageHandler, jwtService)
	srv := server.StartServer(":"+cfg.Port, router)

	// 7. Start Server with Graceful Shutdown
	go func() {
		logger.Info("Server running", "port", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("Server failed to start", "error", err)
			os.Exit(1)
		}
	}()

	// Wait for interrupt signal using channel
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit
	logger.Info("Shutting down server...")

	// Context with timeout for cleanup
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("Server forced to shutdown", "error", err)
	}

	// Wait for DB close (if supported) or other cleanup
	// sqlDB, _ := db.DB()
	// sqlDB.Close()

	logger.Info("Server exiting")
}
