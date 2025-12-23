package middleware

import (
	"fmt"
	"net/http"
	"time"

	"github.com/redis/go-redis/v9"
)

func RedisCache(client *redis.Client, key string, ttl time.Duration, handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		// Try to get cached response
		cached, err := client.Get(ctx, key).Result()
		if err == nil {
			// Cache hit
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(cached))
			return
		}

		// Cache miss: capture response
		rec := NewResponseRecorder(w)
		handler(rec, r)

		// Only cache successful responses
		if rec.StatusCode == http.StatusOK {
			client.Set(ctx, key, rec.Body.String(), ttl)
		}
	}
}

// RedisCacheWithParams creates cache keys dynamically based on request method and query parameters
func RedisCacheWithParams(client *redis.Client, baseKey string, ttl time.Duration, handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		// Generate dynamic cache key
		cacheKey := fmt.Sprintf("%s:%s", baseKey, r.Method)

		// Add query parameters to cache key
		category := r.URL.Query().Get("category")
		if category != "" {
			cacheKey += fmt.Sprintf(":category=%s", category)
		}

		// Try to get cached response
		cached, err := client.Get(ctx, cacheKey).Result()
		if err == nil {
			// Cache hit
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(cached))
			return
		}

		// Cache miss: capture response
		rec := NewResponseRecorder(w)
		handler(rec, r)

		// Only cache successful responses
		if rec.StatusCode == http.StatusOK {
			client.Set(ctx, cacheKey, rec.Body.String(), ttl)
		}
	}
}

func RemoveCache(client *redis.Client, key string, handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rec := NewResponseRecorder(w)
		handler(rec, r)

		// Only refresh if success
		if rec.StatusCode >= 200 && rec.StatusCode < 300 {
			// Refresh the cache using the captured body
			err := client.Del(r.Context(), key).Err()
			if err != nil {
				fmt.Println("⚠️ Failed to refresh cache:", err)
			} else {
				fmt.Println("✅ Refreshed cache key:", key)
			}
		}
	}
}

// RemoveCacheWithParams invalidates cache for endpoints with query parameters
func RemoveCacheWithParams(client *redis.Client, baseKey string, handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rec := NewResponseRecorder(w)
		handler(rec, r)

		// Only refresh if success
		if rec.StatusCode >= 200 && rec.StatusCode < 300 {
			// Use pattern matching to delete all related cache keys
			pattern := fmt.Sprintf("%s:*", baseKey)
			iter := client.Scan(r.Context(), 0, pattern, 0).Iterator()

			deletedCount := 0
			for iter.Next(r.Context()) {
				err := client.Del(r.Context(), iter.Val()).Err()
				if err == nil {
					deletedCount++
				}
			}

			if iter.Err() != nil {
				fmt.Println("⚠️ Failed to refresh cache:", iter.Err())
			} else {
				fmt.Printf("✅ Refreshed %d cache keys matching: %s\n", deletedCount, pattern)
			}
		}
	}
}
