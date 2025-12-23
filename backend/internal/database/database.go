package database

import (
	"fmt"
	"log"

	"github.com/othersidedrl/portfolio/backend/internal/config"
	"github.com/othersidedrl/portfolio/backend/internal/logger"
	"github.com/othersidedrl/portfolio/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB(cfg *config.Config) *gorm.DB {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logger.Error("Failed to connect to DB", "error", err)
		log.Fatal("Failed to connect to DB:", err)
	}

	// Create PostgreSQL enum types (must exist before AutoMigrate)
	enumTypes := []string{
		`DO $$ BEGIN CREATE TYPE career_type AS ENUM ('Education', 'Job'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE skill_level AS ENUM ('Beginner', 'Intermediate', 'Advanced'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE category AS ENUM ('Backend', 'Frontend', 'Other'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE project_type AS ENUM ('Web', 'Mobile', 'Machine Learning'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE contribution_type AS ENUM ('Personal', 'Team'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
	}
	for _, sql := range enumTypes {
		if err := db.Exec(sql).Error; err != nil {
			logger.Warn("Failed to create enum type", "error", err)
		}
	}

	// Auto-migrate tables
	err = db.AutoMigrate(
		&models.HeroPage{},
		&models.AboutPage{},
		&models.TechnicalSkills{},
		&models.CareerJourney{},
		&models.TestimonyPage{},
		&models.Testimony{},
		&models.ProjectPage{},
		&models.Project{},
		// &models.User{},
		// You can add more models here
	)
	if err != nil {
		logger.Error("Auto migration failed", "error", err)
		log.Fatal("Auto migration failed:", err)
	}

	logger.Info("Connected and migrated DB successfully")
	return db
}
