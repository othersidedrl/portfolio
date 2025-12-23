package database

import (
	"fmt"
	"log"
	"os"

	"github.com/othersidedrl/portfolio/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB() *gorm.DB {
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "localhost"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "5432"
	}
	username := os.Getenv("POSTGRES_USER")
	if username == "" {
		username = "postgres"
	}
	password := os.Getenv("POSTGRES_PASSWORD")
	if password == "" {
		password = "yourpassword"
	}
	psqlDB := os.Getenv("POSTGRES_DB")
	if psqlDB == "" {
		psqlDB = "yourdbname"
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, username, password, psqlDB,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to DB:", err)
	}

	enumTypes := []string{
		`DO $$ BEGIN CREATE TYPE career_type AS ENUM ('Education', 'Job'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE skill_level AS ENUM ('Beginner', 'Intermediate', 'Advanced'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE category AS ENUM ('Backend', 'Frontend', 'Other'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE project_type AS ENUM ('Web', 'Mobile', 'Machine Learning'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
		`DO $$ BEGIN CREATE TYPE contribution_type AS ENUM ('Personal', 'Team'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
	}
	for _, sql := range enumTypes {
		if err := db.Exec(sql).Error; err != nil {
			log.Printf("Warning: Failed to create enum type: %v", err)
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
		log.Fatal("Auto migration failed:", err)
	}

	log.Println("✅ Connected and migrated DB successfully!")
	return db
}
