package testimony

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"strings"

	"github.com/othersidedrl/portfolio/backend/internal/config"
)

type Service struct {
	repo TestimonyRepository
	cfg  *config.Config
}

func NewService(repo TestimonyRepository, cfg *config.Config) *Service {
	return &Service{repo, cfg}
}

func (s *Service) GetTestimonyPage(ctx context.Context) (*TestimonyPageDto, error) {
	return s.repo.GetTestimonyPage(ctx)
}

func (s *Service) UpdateTestimonyPage(ctx context.Context, data *TestimonyPageDto) error {
	return s.repo.UpdateTestimonyPage(ctx, data)
}

func (s *Service) GetTestimonies(ctx context.Context) (*TestimonyDto, error) {
	return s.repo.GetTestimonies(ctx)
}

func (s *Service) GetApprovedTestimonies(ctx context.Context) (*TestimonyDto, error) {
	return s.repo.GetApprovedTestimonies(ctx)
}

func (s *Service) CreateTestimony(ctx context.Context, data *TestimonyItemDto) error {
	// Step 0: Set default avatar if missing
	if data.ProfileUrl == "" {
		data.ProfileUrl = fmt.Sprintf("https://api.dicebear.com/7.x/adventurer/svg?seed=%s", url.QueryEscape(data.Name))
	}

	// AI Summary is deferred to the approval stage to prevent spam
	data.AISummary = ""

	return s.repo.CreateTestimony(ctx, data)
}

func (s *Service) UpdateTestimony(ctx context.Context, data *TestimonyItemDto, id uint) error {
	return s.repo.UpdateTestimony(ctx, data, id)
}

func (s *Service) ApproveTestimony(ctx context.Context, data *ApproveTestimonyDto, id uint) error {
	// If approving, generate AI summary if it doesn't exist
	if data.Approved {
		existing, err := s.repo.GetTestimonyByID(ctx, id)
		if err != nil {
			return err
		}

		if existing.AISummary == "" {
			summary, err := s.generateAISummary(ctx, existing.Description)
			if err != nil {
				// Log error but proceed? Or fail? Let's fail for now so admin sees it.
				return fmt.Errorf("failed to generate AI summary: %w", err)
			}
			existing.AISummary = summary
		}

		existing.Approved = true
		// We use UpdateTestimony to save the summary + approval status
		return s.repo.UpdateTestimony(ctx, existing, id)
	}

	return s.repo.ApproveTestimony(ctx, data, id)
}

func (s *Service) generateAISummary(ctx context.Context, description string) (string, error) {
	prompt := fmt.Sprintf(
		`Summarize this testimonial for a developer portfolio in exactly one sentence (max 20 words).

		Rules:
		- Be professional and positive
		- Focus on key strengths (e.g., problem-solving, collaboration, technical skill)
		- Do NOT include names, quotes, or specific project details
		- Do NOT start with "This testimonial..." or similar phrases
		- Output ONLY the summary sentence, nothing else

		Example input: "John was amazing to work with. He helped us build our entire e-commerce platform and was always available to help debug issues. Highly recommend!"
		Example output: A reliable developer who delivers quality solutions and provides excellent technical support.

		Testimonial to summarize: "%s"`,
		description,
	)

	reqBody := OpenRouterRequest{
		Model: "mistralai/mistral-7b-instruct:free",
		Messages: []Message{
			{Role: "user", Content: prompt},
		},
	}

	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", "https://openrouter.ai/api/v1/chat/completions", bytes.NewBuffer(jsonBody))
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "Bearer "+s.cfg.OpenRouterAPIKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("OpenRouter error: %s", string(bodyBytes))
	}

	var responseBody struct {
		Choices []struct {
			Message Message `json:"message"`
		} `json:"choices"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&responseBody); err != nil {
		return "", err
	}

	if len(responseBody.Choices) == 0 {
		return "", fmt.Errorf("no AI summary returned")
	}

	summary := responseBody.Choices[0].Message.Content
	summary = strings.ReplaceAll(summary, "<s>", "")
	summary = strings.ReplaceAll(summary, "</s>", "")
	summary = strings.ReplaceAll(summary, "[OUT]", "")
	summary = strings.ReplaceAll(summary, "[INST]", "")
	summary = strings.ReplaceAll(summary, "[/INST]", "")
	summary = strings.ReplaceAll(summary, "\"", "")
	summary = strings.TrimSpace(summary)

	return summary, nil
}

func (s *Service) DeleteTestimony(ctx context.Context, id uint) error {
	return s.repo.DeleteTestimony(ctx, id)
}
