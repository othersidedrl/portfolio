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
		`DO $$ BEGIN CREATE TYPE skill_level AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
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

	// Seed database with initial data
	seedDatabase(db)

	logger.Info("Connected and migrated DB successfully")
	return db
}

func seedDatabase(db *gorm.DB) {
	// Seed Hero Page
	var hero models.HeroPage
	if err := db.First(&hero).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			db.Create(&models.HeroPage{
				Name:        "Hero Name",
				Title:       "Hero Title",
				Subtitle:    "Hero Subtitle",
				Rank:        "Hero Rank",
				ResumeLink:  "",
				ContactLink: "",
			})
			logger.Info("Seeded Hero Page")
		}
	}

	// Seed About Page
	var about models.AboutPage
	if err := db.First(&about).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			db.Create(&models.AboutPage{
				Description:  "About Description",
				Card1Title:   "Card 1",
				Card1Desc:    "Description",
				Card2Title:   "Card 2",
				Card2Desc:    "Description",
				Card3Title:   "Card 3",
				Card3Desc:    "Description",
				Card4Title:   "Card 4",
				Card4Desc:    "Description",
				GithubLink:   "",
				LinkedinLink: "",
				Available:    true,
			})
			logger.Info("Seeded About Page")
		}
	}

	// Seed Project Page
	var project models.ProjectPage
	if err := db.First(&project).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			db.Create(&models.ProjectPage{
				Title:       "Projects",
				Description: "My Projects",
			})
			logger.Info("Seeded Project Page")
		}
	}

	// Seed Testimony Page
	var testimony models.TestimonyPage
	if err := db.First(&testimony).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			db.Create(&models.TestimonyPage{
				Title:       "Testimonials",
				Description: "What people say",
			})
			logger.Info("Seeded Testimony Page")
		}
	}
}
