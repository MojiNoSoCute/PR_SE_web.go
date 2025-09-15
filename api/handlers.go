package main

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

type Handlers struct {
	DB *DB
}

// Student Works Handlers
func (h *Handlers) GetStudentWorks(c *gin.Context) {
	// Parse query parameters
	limit := c.DefaultQuery("limit", "10")
	offset := c.DefaultQuery("offset", "0")
	category := c.Query("category")

	query := `
		SELECT id, title, description, image_url, category, keywords, read_time, created_at, updated_at
		FROM student_works
	`
	args := []interface{}{}
	argCount := 0

	if category != "" {
		query += " WHERE category = $" + strconv.Itoa(argCount+1)
		args = append(args, category)
		argCount++
	}

	query += " ORDER BY created_at DESC LIMIT $" + strconv.Itoa(argCount+1) + " OFFSET $" + strconv.Itoa(argCount+2)
	args = append(args, limit, offset)

	rows, err := h.DB.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var works []StudentWork
	for rows.Next() {
		var work StudentWork
		err := rows.Scan(&work.ID, &work.Title, &work.Description, &work.ImageURL, 
			&work.Category, &work.Keywords, &work.ReadTime, &work.CreatedAt, &work.UpdatedAt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		works = append(works, work)
	}

	c.JSON(http.StatusOK, gin.H{"data": works})
}

func (h *Handlers) GetStudentWork(c *gin.Context) {
	id := c.Param("id")

	var work StudentWork
	query := `
		SELECT id, title, description, image_url, category, keywords, read_time, created_at, updated_at
		FROM student_works WHERE id = $1
	`
	
	err := h.DB.QueryRow(query, id).Scan(&work.ID, &work.Title, &work.Description, 
		&work.ImageURL, &work.Category, &work.Keywords, &work.ReadTime, &work.CreatedAt, &work.UpdatedAt)
	
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student work not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": work})
}

func (h *Handlers) CreateStudentWork(c *gin.Context) {
	var work StudentWork
	if err := c.ShouldBindJSON(&work); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		INSERT INTO student_works (title, description, image_url, category, keywords, read_time)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, created_at, updated_at
	`
	
	err := h.DB.QueryRow(query, work.Title, work.Description, work.ImageURL, 
		work.Category, work.Keywords, work.ReadTime).Scan(&work.ID, &work.CreatedAt, &work.UpdatedAt)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": work})
}

// Faculty Handlers
func (h *Handlers) GetFaculty(c *gin.Context) {
	query := `
		SELECT id, name_thai, name_english, position, department, image_url, bio, email, phone, created_at, updated_at
		FROM faculty ORDER BY position, name_thai
	`
	
	rows, err := h.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var faculty []Faculty
	for rows.Next() {
		var member Faculty
		err := rows.Scan(&member.ID, &member.NameThai, &member.NameEnglish, &member.Position,
			&member.Department, &member.ImageURL, &member.Bio, &member.Email, &member.Phone,
			&member.CreatedAt, &member.UpdatedAt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		faculty = append(faculty, member)
	}

	c.JSON(http.StatusOK, gin.H{"data": faculty})
}

func (h *Handlers) GetFacultyMember(c *gin.Context) {
	id := c.Param("id")

	var member Faculty
	query := `
		SELECT id, name_thai, name_english, position, department, image_url, bio, email, phone, created_at, updated_at
		FROM faculty WHERE id = $1
	`
	
	err := h.DB.QueryRow(query, id).Scan(&member.ID, &member.NameThai, &member.NameEnglish,
		&member.Position, &member.Department, &member.ImageURL, &member.Bio, &member.Email,
		&member.Phone, &member.CreatedAt, &member.UpdatedAt)
	
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Faculty member not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member})
}

// Publications Handlers
func (h *Handlers) GetPublications(c *gin.Context) {
	category := c.Query("category")
	year := c.Query("year")

	query := `
		SELECT id, title, abstract, authors, journal, publication_date, doi, pdf_url, keywords, category, created_at, updated_at
		FROM publications
	`
	args := []interface{}{}
	conditions := []string{}
	argCount := 0

	if category != "" {
		argCount++
		conditions = append(conditions, "category = $"+strconv.Itoa(argCount))
		args = append(args, category)
	}

	if year != "" {
		argCount++
		conditions = append(conditions, "EXTRACT(YEAR FROM publication_date) = $"+strconv.Itoa(argCount))
		args = append(args, year)
	}

	if len(conditions) > 0 {
		query += " WHERE " + conditions[0]
		for i := 1; i < len(conditions); i++ {
			query += " AND " + conditions[i]
		}
	}

	query += " ORDER BY publication_date DESC"

	rows, err := h.DB.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var publications []Publication
	for rows.Next() {
		var pub Publication
		err := rows.Scan(&pub.ID, &pub.Title, &pub.Abstract, pq.Array(&pub.Authors),
			&pub.Journal, &pub.PublicationDate, &pub.DOI, &pub.PDFURL, &pub.Keywords,
			&pub.Category, &pub.CreatedAt, &pub.UpdatedAt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		publications = append(publications, pub)
	}

	c.JSON(http.StatusOK, gin.H{"data": publications})
}

// Analytics Handlers
func (h *Handlers) GetDashboardAnalytics(c *gin.Context) {
	analytics := gin.H{}

	// Count student works
	var studentWorksCount int
	err := h.DB.QueryRow("SELECT COUNT(*) FROM student_works").Scan(&studentWorksCount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	analytics["student_works_count"] = studentWorksCount

	// Count faculty
	var facultyCount int
	err = h.DB.QueryRow("SELECT COUNT(*) FROM faculty").Scan(&facultyCount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	analytics["faculty_count"] = facultyCount

	// Count publications
	var publicationsCount int
	err = h.DB.QueryRow("SELECT COUNT(*) FROM publications").Scan(&publicationsCount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	analytics["publications_count"] = publicationsCount

	// Count announcements
	var announcementsCount int
	err = h.DB.QueryRow("SELECT COUNT(*) FROM announcements").Scan(&announcementsCount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	analytics["announcements_count"] = announcementsCount

	c.JSON(http.StatusOK, gin.H{"data": analytics})
}

// Search Handler
func (h *Handlers) SearchContent(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Search query is required"})
		return
	}

	results := gin.H{}

	// Search student works
	studentWorksQuery := `
		SELECT id, title, description, category FROM student_works 
		WHERE title ILIKE $1 OR description ILIKE $1 
		LIMIT 5
	`
	rows, err := h.DB.Query(studentWorksQuery, "%"+query+"%")
	if err == nil {
		var studentWorks []gin.H
		for rows.Next() {
			var id, title, category string
			var description *string
			rows.Scan(&id, &title, &description, &category)
			studentWorks = append(studentWorks, gin.H{
				"id": id, "title": title, "description": description, "category": category, "type": "student_work",
			})
		}
		rows.Close()
		results["student_works"] = studentWorks
	}

	// Search publications
	publicationsQuery := `
		SELECT id, title, abstract, journal FROM publications 
		WHERE title ILIKE $1 OR abstract ILIKE $1 
		LIMIT 5
	`
	rows, err = h.DB.Query(publicationsQuery, "%"+query+"%")
	if err == nil {
		var publications []gin.H
		for rows.Next() {
			var id, title string
			var abstract, journal *string
			rows.Scan(&id, &title, &abstract, &journal)
			publications = append(publications, gin.H{
				"id": id, "title": title, "abstract": abstract, "journal": journal, "type": "publication",
			})
		}
		rows.Close()
		results["publications"] = publications
	}

	c.JSON(http.StatusOK, gin.H{"data": results})
}

// Placeholder handlers for other endpoints
func (h *Handlers) UpdateStudentWork(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Update student work endpoint"})
}

func (h *Handlers) DeleteStudentWork(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Delete student work endpoint"})
}

func (h *Handlers) CreateFacultyMember(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Create faculty member endpoint"})
}

func (h *Handlers) UpdateFacultyMember(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Update faculty member endpoint"})
}

func (h *Handlers) DeleteFacultyMember(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Delete faculty member endpoint"})
}

func (h *Handlers) GetPublication(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Get publication endpoint"})
}

func (h *Handlers) CreatePublication(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Create publication endpoint"})
}

func (h *Handlers) UpdatePublication(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Update publication endpoint"})
}

func (h *Handlers) DeletePublication(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Delete publication endpoint"})
}

func (h *Handlers) GetAnnouncements(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Get announcements endpoint"})
}

func (h *Handlers) GetAnnouncement(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Get announcement endpoint"})
}

func (h *Handlers) CreateAnnouncement(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Create announcement endpoint"})
}

func (h *Handlers) UpdateAnnouncement(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Update announcement endpoint"})
}

func (h *Handlers) DeleteAnnouncement(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Delete announcement endpoint"})
}

func (h *Handlers) GetPopularContent(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Get popular content endpoint"})
}

func (h *Handlers) GetSearchSuggestions(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Get search suggestions endpoint"})
}
