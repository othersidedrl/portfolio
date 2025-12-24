package about

import (
	"context"
	"errors"

	"github.com/othersidedrl/portfolio/backend/internal/models"
	"gorm.io/gorm"
)

type AboutRepository interface {
	Find(ctx context.Context) (*AboutPageDto, error)
	Update(ctx context.Context, data *AboutPageDto) error
	GetTechnicalSkills(ctx context.Context) (*TechnicalSkillDto, error)
	CreateTechnicalSkill(ctx context.Context, data *SkillItemDto) error
	UpdateTechnicalSkill(ctx context.Context, data *SkillItemDto, id uint) error
	DeleteTechnicalSkill(ctx context.Context, id uint) error
	GetCareers(ctx context.Context) (*CareerJourneyDto, error)
	CreateCareer(ctx context.Context, data *CareerItemDto) error
	UpdateCareer(ctx context.Context, data *CareerItemDto, id uint) error
	DeleteCareer(ctx context.Context, id uint) error
}

type GormAboutRepository struct {
	db *gorm.DB
}

func NewGormAboutRepository(db *gorm.DB) *GormAboutRepository {
	return &GormAboutRepository{db: db}
}

func (r *GormAboutRepository) Find(ctx context.Context) (*AboutPageDto, error) {
	var about models.AboutPage

	// Load AboutPage (cards are now embedded)
	if err := r.db.WithContext(ctx).
		First(&about).Error; err != nil {
		return nil, err
	}

	// Map to DTO
	cards := []CardDto{
		{
			Title:       about.Card1Title,
			Description: about.Card1Desc,
		},
		{
			Title:       about.Card2Title,
			Description: about.Card2Desc,
		},
		{
			Title:       about.Card3Title,
			Description: about.Card3Desc,
		},
		{
			Title:       about.Card4Title,
			Description: about.Card4Desc,
		},
	}

	dto := &AboutPageDto{
		Description:  about.Description,
		Cards:        cards,
		GithubLink:   about.GithubLink,
		LinkedinLink: about.LinkedinLink,
		Available:    about.Available,
	}

	return dto, nil
}

func (r *GormAboutRepository) Update(ctx context.Context, data *AboutPageDto) error {
	var existing models.AboutPage

	err := r.db.WithContext(ctx).First(&existing).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Create new record with embedded cards
			aboutPage := models.AboutPage{
				Description:  data.Description,
				GithubLink:   data.GithubLink,
				LinkedinLink: data.LinkedinLink,
				Available:    data.Available,
			}

			// Map cards from DTO (up to 4)
			if len(data.Cards) > 0 {
				aboutPage.Card1Title = data.Cards[0].Title
				aboutPage.Card1Desc = data.Cards[0].Description
			}
			if len(data.Cards) > 1 {
				aboutPage.Card2Title = data.Cards[1].Title
				aboutPage.Card2Desc = data.Cards[1].Description
			}
			if len(data.Cards) > 2 {
				aboutPage.Card3Title = data.Cards[2].Title
				aboutPage.Card3Desc = data.Cards[2].Description
			}
			if len(data.Cards) > 3 {
				aboutPage.Card4Title = data.Cards[3].Title
				aboutPage.Card4Desc = data.Cards[3].Description
			}

			return r.db.WithContext(ctx).Create(&aboutPage).Error
		}
		return err
	}

	// Update existing record
	existing.Description = data.Description
	existing.GithubLink = data.GithubLink
	existing.LinkedinLink = data.LinkedinLink
	existing.Available = data.Available

	// Update embedded cards
	if len(data.Cards) > 0 {
		existing.Card1Title = data.Cards[0].Title
		existing.Card1Desc = data.Cards[0].Description
	}
	if len(data.Cards) > 1 {
		existing.Card2Title = data.Cards[1].Title
		existing.Card2Desc = data.Cards[1].Description
	}
	if len(data.Cards) > 2 {
		existing.Card3Title = data.Cards[2].Title
		existing.Card3Desc = data.Cards[2].Description
	}
	if len(data.Cards) > 3 {
		existing.Card4Title = data.Cards[3].Title
		existing.Card4Desc = data.Cards[3].Description
	}

	return r.db.WithContext(ctx).Save(&existing).Error
}

func (r *GormAboutRepository) GetTechnicalSkills(ctx context.Context) (*TechnicalSkillDto, error) {
	var skills []models.TechnicalSkills

	if err := r.db.WithContext(ctx).Find(&skills).Error; err != nil {
		return nil, err
	}

	// Map to DTO
	var dtoSkills []SkillItemDto
	for _, skill := range skills {
		dtoSkills = append(dtoSkills, SkillItemDto{
			ID:               skill.ID,
			Name:             skill.Name,
			Description:      skill.Description,
			Specialities:     skill.Specialities,
			Level:            string(skill.Level),
			Category:         string(skill.Category),
			YearOfExperience: skill.YearOfExperience,
		})
	}

	return &TechnicalSkillDto{
		Skills: dtoSkills,
	}, nil
}

func (r *GormAboutRepository) CreateTechnicalSkill(ctx context.Context, data *SkillItemDto) error {
	skill := models.TechnicalSkills{
		Name:             data.Name,
		Description:      data.Description,
		Specialities:     data.Specialities,
		Level:            models.SkillLevel(data.Level),
		Category:         models.Cateogry(data.Category),
		YearOfExperience: data.YearOfExperience,
	}

	return r.db.WithContext(ctx).Create(&skill).Error
}

func (r *GormAboutRepository) UpdateTechnicalSkill(ctx context.Context, data *SkillItemDto, id uint) error {
	return r.db.WithContext(ctx).Where("id = ?", id).Updates(
		models.TechnicalSkills{
			Name:             data.Name,
			Description:      data.Description,
			Specialities:     data.Specialities,
			Level:            models.SkillLevel(data.Level),
			Category:         models.Cateogry(data.Category),
			YearOfExperience: data.YearOfExperience,
		}).Error
}

func (r *GormAboutRepository) DeleteTechnicalSkill(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).Where("id = ?", id).Unscoped().Delete(&models.TechnicalSkills{}).Error
}

func (r *GormAboutRepository) GetCareers(ctx context.Context) (*CareerJourneyDto, error) {
	var careers []models.CareerJourney

	if err := r.db.WithContext(ctx).Find(&careers).Error; err != nil {
		return nil, err
	}

	var dtoCareers []CareerItemDto
	for _, career := range careers {
		dtoCareers = append(dtoCareers, CareerItemDto{
			ID:          career.ID,
			Title:       career.Title,
			Description: career.Description,
			Affiliation: career.Affiliation,
			Location:    career.Location,
			Type:        string(career.Type),
			StartedAt:   career.StartedAt,
			EndedAt:     career.EndedAt,
		})
	}

	return &CareerJourneyDto{
		Careers: dtoCareers,
	}, nil
}

func (r *GormAboutRepository) CreateCareer(ctx context.Context, data *CareerItemDto) error {
	return r.db.WithContext(ctx).Create(&models.CareerJourney{
		Title:       data.Title,
		Description: data.Description,
		Affiliation: data.Affiliation,
		Location:    data.Location,
		Type:        models.CareerType(data.Type),
		StartedAt:   data.StartedAt,
		EndedAt:     data.EndedAt,
	}).Error
}

func (r *GormAboutRepository) UpdateCareer(ctx context.Context, data *CareerItemDto, id uint) error {
	return r.db.WithContext(ctx).Where("id = ?", id).Updates(&models.CareerJourney{
		Title:       data.Title,
		Description: data.Description,
		Affiliation: data.Affiliation,
		Location:    data.Location,
		Type:        models.CareerType(data.Type),
		StartedAt:   data.StartedAt,
		EndedAt:     data.EndedAt,
	}).Error
}

func (r *GormAboutRepository) DeleteCareer(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).Where("id = ?", id).Unscoped().Delete(&models.CareerJourney{}).Error
}
