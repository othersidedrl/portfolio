package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port           string
	AllowedOrigins []string

	// Database
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string

	// Redis
	RedisHost     string
	RedisPort     string
	RedisPassword string

	// Auth
	JWTSecret         string
	AdminEmail        string
	AdminPasswordHash string
	AdminID           string

	// External Services
	CloudinaryName      string
	CloudinaryAPIKey    string
	CloudinaryAPISecret string
	OpenRouterAPIKey    string
}

func Load() (*Config, error) {
	// Load .env file if it exists (ignore error if missing, rely on env vars)
	_ = godotenv.Load()

	cfg := &Config{
		Port: getEnv("PORT", "8080"),

		// Database
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("POSTGRES_USER", "postgres"),
		DBPassword: getEnv("POSTGRES_PASSWORD", ""),
		DBName:     getEnv("POSTGRES_DB", "postgres"),

		// Redis
		RedisHost:     getEnv("REDIS_HOST", "localhost"),
		RedisPort:     getEnv("REDIS_PORT", "6379"),
		RedisPassword: getEnv("REDIS_PASSWORD", ""),

		// Auth
		JWTSecret:         getEnv("JWT_SECRET", ""),
		AdminEmail:        getEnv("ADMIN_EMAIL", ""),
		AdminPasswordHash: getEnv("ADMIN_PASSWORD_HASH", ""),
		AdminID:           getEnv("ADMIN_ID", ""),

		// External
		CloudinaryName:      getEnv("CLOUDINARY_NAME", ""),
		CloudinaryAPIKey:    getEnv("CLOUDINARY_APIKEY", ""),
		CloudinaryAPISecret: getEnv("CLOUDINARY_APISECRET", ""),
		OpenRouterAPIKey:    getEnv("OPENROUTER_APIKEY", ""),
	}

	// Process Allowed Origins
	allowedOrigins := getEnv("ALLOWED_ORIGINS", "http://localhost:3000")
	cfg.AllowedOrigins = strings.Split(allowedOrigins, ",")

	// Validate required fields
	if err := cfg.validate(); err != nil {
		return nil, err
	}

	return cfg, nil
}

func (c *Config) validate() error {
	required := map[string]string{
		"JWT_SECRET":           c.JWTSecret,
		"ADMIN_EMAIL":          c.AdminEmail,
		"CLOUDINARY_NAME":      c.CloudinaryName,
		"CLOUDINARY_APIKEY":    c.CloudinaryAPIKey,
		"CLOUDINARY_APISECRET": c.CloudinaryAPISecret,
		"OPENROUTER_APIKEY":    c.OpenRouterAPIKey,
	}

	for key, val := range required {
		if val == "" {
			return fmt.Errorf("missing required environment variable: %s", key)
		}
	}
	return nil
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
