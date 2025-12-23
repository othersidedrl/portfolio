package testimony

type TestimonyPageDto struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type TestimonyItemDto struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ProfileUrl  string `json:"profile_url"`
	Affiliation string `json:"affiliation"`
	Rating      int    `json:"rating"`
	Description string `json:"description"`
	AISummary   string `json:"ai_summary"`
	Approved    bool   `json:"approved"`
}

type TestimonyDto struct {
	Testimonies []TestimonyItemDto `json:"testimonies"`
}

type ApproveTestimonyDto struct {
	Approved bool `json:"approved"`
}

// OpenRouter Types
type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type OpenRouterRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}
