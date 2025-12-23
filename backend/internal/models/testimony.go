package models

import (
	"time"

	"gorm.io/gorm"
)

// ============================================================================
// Testimony Page
// ============================================================================

type TestimonyPage struct {
	gorm.Model
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	UpdatedAt   time.Time `json:"updated_at"`
	CreatedAt   time.Time `json:"created_at"`
}

// ============================================================================
// Testimony
// ============================================================================

type Testimony struct {
	gorm.Model
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name"`
	ProfileUrl  string    `json:"profile_url"`
	Affiliation string    `json:"affiliation"`
	Rating      int       `json:"rating"`
	Description string    `json:"description"`
	AISummary   string    `json:"ai_summary"`
	Approved    bool      `json:"approved"`
	UpdatedAt   time.Time `json:"updated_at"`
	CreatedAt   time.Time `json:"created_at"`
}
