package models

import (
	"database/sql/driver"
	"fmt"
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

// ============================================================================
// About Page
// ============================================================================

type AboutPage struct {
	gorm.Model
	ID           uint        `json:"id" gorm:"primaryKey"`
	Description  string      `json:"description"`
	Cards        []AboutCard `json:"cards" gorm:"foreignKey:AboutPageID"`
	GithubLink   string      `json:"github_link"`
	LinkedinLink string      `json:"linkedin_link"`
	Available    bool        `json:"available"`
	UpdatedAt    time.Time   `json:"updated_at"`
	CreatedAt    time.Time   `json:"created_at"`
}

type AboutCard struct {
	gorm.Model
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	AboutPageID uint      `json:"about_page_id"`
	UpdatedAt   time.Time `json:"updated_at"`
	CreatedAt   time.Time `json:"created_at"`
}

// ============================================================================
// Career Journey
// ============================================================================

type CareerType string

const (
	Education CareerType = "Education"
	Job       CareerType = "Job"
)

func (ct *CareerType) Scan(value interface{}) error {
	str, ok := value.(string)
	if !ok {
		return fmt.Errorf("cannot scan CareerType from %T", value)
	}
	*ct = CareerType(str)
	return nil
}

func (ct CareerType) Value() (driver.Value, error) {
	return string(ct), nil
}

type CareerJourney struct {
	gorm.Model
	ID          uint       `json:"id" gorm:"primaryKey"`
	StartedAt   string     `json:"startedAt"`
	EndedAt     string     `json:"endedAt"`
	Title       string     `json:"title"`
	Affiliation string     `json:"affiliation"`
	Description string     `json:"description"`
	Location    string     `json:"location"`
	Type        CareerType `json:"type" gorm:"type:career_type"`
	UpdatedAt   time.Time  `json:"updated_at"`
	CreatedAt   time.Time  `json:"created_at"`
}

// ============================================================================
// Technical Skills
// ============================================================================

type SkillLevel string
type Cateogry string

const (
	Beginner     SkillLevel = "Beginner"
	Intermediate SkillLevel = "Intermediate"
	Advanced     SkillLevel = "Advanced"
)

const (
	Backend  Cateogry = "Backend"
	Frontend Cateogry = "Frontend"
	Other    Cateogry = "Other"
)

func (sl *SkillLevel) Scan(value interface{}) error {
	str, ok := value.(string)
	if !ok {
		return fmt.Errorf("cannot scan SkillLevel from %T", value)
	}
	*sl = SkillLevel(str)
	return nil
}

func (sl *Cateogry) Scan(value interface{}) error {
	str, ok := value.(string)
	if !ok {
		return fmt.Errorf("cannot scan Category from %T", value)
	}
	*sl = Cateogry(str)
	return nil
}

func (sl SkillLevel) Value() (driver.Value, error) {
	return string(sl), nil
}

func (sl Cateogry) Value() (driver.Value, error) {
	return string(sl), nil
}

type TechnicalSkills struct {
	gorm.Model
	ID           uint           `json:"id" gorm:"primaryKey"`
	Name         string         `json:"name"`
	Description  string         `json:"description"`
	Specialities pq.StringArray `json:"specialities" gorm:"type:text[]"`
	Level        SkillLevel     `json:"level" gorm:"type:skill_level"`
	Category     Cateogry       `json:"category" gorm:"type:category"`
	UpdatedAt    time.Time      `json:"updated_at"`
	CreatedAt    time.Time      `json:"created_at"`
}
