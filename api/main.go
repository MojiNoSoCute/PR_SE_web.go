package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "https://*.vercel.app"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	r.Use(cors.New(config))

	// Initialize database connection
	db, err := InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Initialize handlers
	handlers := &Handlers{DB: db}

	// API routes
	api := r.Group("/api/v1")
	{
		// Student works endpoints
		api.GET("/student-works", handlers.GetStudentWorks)
		api.GET("/student-works/:id", handlers.GetStudentWork)
		api.POST("/student-works", handlers.CreateStudentWork)
		api.PUT("/student-works/:id", handlers.UpdateStudentWork)
		api.DELETE("/student-works/:id", handlers.DeleteStudentWork)

		// Faculty endpoints
		api.GET("/faculty", handlers.GetFaculty)
		api.GET("/faculty/:id", handlers.GetFacultyMember)
		api.POST("/faculty", handlers.CreateFacultyMember)
		api.PUT("/faculty/:id", handlers.UpdateFacultyMember)
		api.DELETE("/faculty/:id", handlers.DeleteFacultyMember)

		// Publications endpoints
		api.GET("/publications", handlers.GetPublications)
		api.GET("/publications/:id", handlers.GetPublication)
		api.POST("/publications", handlers.CreatePublication)
		api.PUT("/publications/:id", handlers.UpdatePublication)
		api.DELETE("/publications/:id", handlers.DeletePublication)

		// Announcements endpoints
		api.GET("/announcements", handlers.GetAnnouncements)
		api.GET("/announcements/:id", handlers.GetAnnouncement)
		api.POST("/announcements", handlers.CreateAnnouncement)
		api.PUT("/announcements/:id", handlers.UpdateAnnouncement)
		api.DELETE("/announcements/:id", handlers.DeleteAnnouncement)

		// Analytics endpoints
		api.GET("/analytics/dashboard", handlers.GetDashboardAnalytics)
		api.GET("/analytics/popular-content", handlers.GetPopularContent)

		// Search endpoints
		api.GET("/search", handlers.SearchContent)
		api.GET("/search/suggestions", handlers.GetSearchSuggestions)
	}

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "thai-university-api",
			"version": "1.0.0",
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
