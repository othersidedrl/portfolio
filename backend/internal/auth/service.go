package auth

import (
	"errors"

	"github.com/alexedwards/argon2id"
	"github.com/othersidedrl/portfolio/backend/internal/config"
	"github.com/othersidedrl/portfolio/backend/internal/utils"
)

// Service contains the business logic for auth
type Service struct {
	jwt *utils.JWTService
	cfg *config.Config
}

func NewService(jwt *utils.JWTService, cfg *config.Config) *Service {
	return &Service{
		jwt: jwt,
		cfg: cfg,
	}
}

// Login checks the credentials and returns a token
func (s *Service) Login(email, password string) (string, error) {
	// Check against config credentials
	if email != s.cfg.AdminEmail {
		return "", errors.New("Unauthorized")
	}

	match, err := argon2id.ComparePasswordAndHash(password, s.cfg.AdminPasswordHash)
	if err != nil || !match {
		return "", errors.New("Unauthorized")
	}

	return s.jwt.GenerateToken(s.cfg.AdminID)
}
