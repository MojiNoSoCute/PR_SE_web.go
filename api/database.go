package main

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

type DB struct {
	*sql.DB
}

func InitDB() (*DB, error) {
	// Get database URL from environment
	dbURL := os.Getenv("POSTGRES_URL")
	if dbURL == "" {
		return nil, fmt.Errorf("POSTGRES_URL environment variable is required")
	}

	// Connect to database
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Test connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &DB{db}, nil
}

// Student Work model
type StudentWork struct {
	ID          string  `json:"id" db:"id"`
	Title       string  `json:"title" db:"title"`
	Description *string `json:"description" db:"description"`
	ImageURL    *string `json:"image_url" db:"image_url"`
	Category    *string `json:"category" db:"category"`
	Keywords    *string `json:"keywords" db:"keywords"`
	ReadTime    *int    `json:"read_time" db:"read_time"`
	CreatedAt   string  `json:"created_at" db:"created_at"`
	UpdatedAt   string  `json:"updated_at" db:"updated_at"`
}

// Faculty model
type Faculty struct {
	ID          string  `json:"id" db:"id"`
	NameThai    string  `json:"name_thai" db:"name_thai"`
	NameEnglish *string `json:"name_english" db:"name_english"`
	Position    *string `json:"position" db:"position"`
	Department  *string `json:"department" db:"department"`
	ImageURL    *string `json:"image_url" db:"image_url"`
	Bio         *string `json:"bio" db:"bio"`
	Email       *string `json:"email" db:"email"`
	Phone       *string `json:"phone" db:"phone"`
	CreatedAt   string  `json:"created_at" db:"created_at"`
	UpdatedAt   string  `json:"updated_at" db:"updated_at"`
}

// Publication model
type Publication struct {
	ID              string    `json:"id" db:"id"`
	Title           string    `json:"title" db:"title"`
	Abstract        *string   `json:"abstract" db:"abstract"`
	Authors         []string  `json:"authors" db:"authors"`
	Journal         *string   `json:"journal" db:"journal"`
	PublicationDate *string   `json:"publication_date" db:"publication_date"`
	DOI             *string   `json:"doi" db:"doi"`
	PDFURL          *string   `json:"pdf_url" db:"pdf_url"`
	Keywords        *string   `json:"keywords" db:"keywords"`
	Category        *string   `json:"category" db:"category"`
	CreatedAt       string    `json:"created_at" db:"created_at"`
	UpdatedAt       string    `json:"updated_at" db:"updated_at"`
}

// Announcement model
type Announcement struct {
	ID          string  `json:"id" db:"id"`
	Title       string  `json:"title" db:"title"`
	Content     *string `json:"content" db:"content"`
	ImageURL    *string `json:"image_url" db:"image_url"`
	Category    *string `json:"category" db:"category"`
	IsFeatured  bool    `json:"is_featured" db:"is_featured"`
	PublishedAt string  `json:"published_at" db:"published_at"`
	CreatedAt   string  `json:"created_at" db:"created_at"`
	UpdatedAt   string  `json:"updated_at" db:"updated_at"`
}
