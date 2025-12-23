package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type HeroPage struct {
	gorm.Model
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name"`
	Rank        string         `json:"rank"`
	Title       string         `json:"title"`
	Subtitle    string         `json:"subtitle"`
	ResumeLink  string         `json:"resume_link"`
	ContactLink string         `json:"contact_link"`
	ImageURL1   string         `json:"image_url_1"`
	ImageURL2   string         `json:"image_url_2"`
	ImageURL3   string         `json:"image_url_3"`
	ImageURL4   string         `json:"image_url_4"`
	Hobbies     pq.StringArray `json:"hobbies" gorm:"type:text[]"`
	UpdatedAt   time.Time      `json:"updated_at"`
	CreatedAt   time.Time      `json:"created_at"`
}
