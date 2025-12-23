package utils

import (
	"context"
	"fmt"
	"os"

	"github.com/othersidedrl/portfolio/backend/internal/config"
	"github.com/othersidedrl/portfolio/backend/internal/logger"
	"github.com/redis/go-redis/v9"
)

var (
	RedisClient *redis.Client
	RedisCtx    = context.Background()
)

func InitRedis(cfg *config.Config) {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", cfg.RedisHost, cfg.RedisPort),
		Password: cfg.RedisPassword,
		DB:       0,
	})

	if err := RedisClient.Ping(RedisCtx).Err(); err != nil {
		logger.Error("Failed to connect to Redis", "error", err)
		os.Exit(1)
	}
	logger.Info("Redis connected")
}
