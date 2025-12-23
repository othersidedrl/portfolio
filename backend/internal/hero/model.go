package hero

type HeroPageDto struct {
	Name        string   `json:"name"`
	Rank        string   `json:"rank"`
	Title       string   `json:"title"`
	Subtitle    string   `json:"subtitle"`
	ResumeLink  string   `json:"resume_link"`
	ContactLink string   `json:"contact_link"`
	ImageUrl1   string   `json:"image_url_1"`
	ImageUrl2   string   `json:"image_url_2"`
	ImageUrl3   string   `json:"image_url_3"`
	ImageUrl4   string   `json:"image_url_4"`
	Hobbies     []string `json:"hobbies"`
}
