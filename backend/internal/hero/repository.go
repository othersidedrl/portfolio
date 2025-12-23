package hero

import (
	"context"
	"errors"

	"github.com/othersidedrl/portfolio/backend/internal/models"
	"gorm.io/gorm"
)

// HeroRepository defines the interface for data access
type HeroRepository interface {
	Find(ctx context.Context) (*HeroPageDto, error)
	Update(ctx context.Context, data *HeroPageDto) error
}

// GormHeroRepository is a GORM-based implementation of HeroRepository
type GormHeroRepository struct {
	db *gorm.DB
}

// NewGormHeroRepository creates a new instance of GormHeroRepository
func NewGormHeroRepository(db *gorm.DB) *GormHeroRepository {
	return &GormHeroRepository{db: db}
}

// Find retrieves the hero page from the database (assumes single row)
func (r *GormHeroRepository) Find(ctx context.Context) (*HeroPageDto, error) {
	var hero models.HeroPage
	if err := r.db.WithContext(ctx).First(&hero).Error; err != nil {
		return nil, err
	}

	dto := HeroPageDto{
		Name:        hero.Name,
		Rank:        hero.Rank,
		Title:       hero.Title,
		Subtitle:    hero.Subtitle,
		ResumeLink:  hero.ResumeLink,
		ContactLink: hero.ContactLink,
		ImageUrl1:   hero.ImageURL1,
		ImageUrl2:   hero.ImageURL2,
		ImageUrl3:   hero.ImageURL3,
		ImageUrl4:   hero.ImageURL4,
		Hobbies:     hero.Hobbies,
	}

	return &dto, nil
}

// Update modifies the hero page
func (r *GormHeroRepository) Update(ctx context.Context, data *HeroPageDto) error {
	var existing models.HeroPage
	err := r.db.WithContext(ctx).First(&existing).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			newHero := &models.HeroPage{
				Name:        data.Name,
				Rank:        data.Rank,
				Title:       data.Title,
				Subtitle:    data.Subtitle,
				ResumeLink:  data.ResumeLink,
				ContactLink: data.ContactLink,
				ImageURL1:   data.ImageUrl1,
				ImageURL2:   data.ImageUrl2,
				ImageURL3:   data.ImageUrl3,
				ImageURL4:   data.ImageUrl4,
				Hobbies:     data.Hobbies,
			}
			return r.db.WithContext(ctx).Create(newHero).Error
		}
		return err
	}

	existing.Name = data.Name
	existing.Rank = data.Rank
	existing.Title = data.Title
	existing.Subtitle = data.Subtitle
	existing.ResumeLink = data.ResumeLink
	existing.ContactLink = data.ContactLink
	existing.ImageURL1 = data.ImageUrl1
	existing.ImageURL2 = data.ImageUrl2
	existing.ImageURL3 = data.ImageUrl3
	existing.ImageURL4 = data.ImageUrl4
	existing.Hobbies = data.Hobbies

	return r.db.WithContext(ctx).Save(&existing).Error
}
