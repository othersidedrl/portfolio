package utils

import (
	"encoding/json"
	"net/http"

	"github.com/othersidedrl/portfolio/backend/internal/logger"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

// WriteJSON sends a JSON response with the specified status code
func WriteJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		logger.Error("Failed to encode response", "error", err)
	}
}

// WriteError sends a user-facing error message (sanitized)
func WriteError(w http.ResponseWriter, status int, message string) {
	WriteJSON(w, status, ErrorResponse{Error: message})
}

// WriteServerError logs the actual error and sends a generic 500 message
func WriteServerError(w http.ResponseWriter, err error) {
	logger.Error("Internal Server Error", "error", err)
	WriteError(w, http.StatusInternalServerError, "Internal Server Error")
}
