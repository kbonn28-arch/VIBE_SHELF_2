# VibeShelf API Documentation

## Overview

The VibeShelf API provides RESTful endpoints for book management, user authentication, and mood-based recommendations. Built with Node.js and Express, secured with authentication middleware and powered by Supabase database.

## Base URL

- **Development**: `http://localhost:3001/api`
- **Production**: `https://your-domain.com/api`

## Authentication

All API endpoints (except public ones) require authentication via Bearer token:

```http
Authorization: Bearer <your-jwt-token>
```

### Authentication Endpoints

#### POST /auth/signin
Sign in existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "avatar_url": "https://example.com/avatar.jpg",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    },
    "token": "jwt-token-string",
    "expires_in": 3600
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

#### POST /auth/signup
Register new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**Response (201):**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "avatar_url": null,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    },
    "token": "jwt-token-string",
    "expires_in": 3600
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - Email already exists
- `500` - Server error

#### POST /auth/signout
Sign out current user (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Signed out successfully"
}
```

#### GET /auth/me
Get current user profile (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "avatar_url": "https://example.com/avatar.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

## Books Endpoints

### GET /books
Get list of all books with optional filtering.

**Query Parameters:**
- `search` (string) - Search by title or author
- `genre` (string) - Filter by genre
- `author` (string) - Filter by author
- `minRating` (number) - Minimum average rating (1-5)
- `limit` (number) - Results per page (default: 20, max: 100)
- `offset` (number) - Pagination offset (default: 0)

**Example Request:**
```http
GET /api/books?search=Harry%20Potter&genre=Fantasy&minRating=4&limit=10&offset=0
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Book Title",
      "author": "Author Name",
      "isbn": "978-1234567890",
      "cover_url": "https://example.com/cover.jpg",
      "description": "Book description",
      "genre": ["Fiction", "Fantasy"],
      "publication_year": 2020,
      "page_count": 350,
      "language": "English",
      "average_rating": 4.5,
      "rating_count": 1250,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /books/:id
Get specific book by ID.

**Path Parameters:**
- `id` (string) - Book UUID

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "title": "Book Title",
    "author": "Author Name",
    // ... other book fields
  }
}
```

**Error Responses:**
- `404` - Book not found
- `500` - Server error

### GET /books/user/my-books
Get current user's books (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (string) - Filter by reading status (`want_to_read`, `reading`, `read`, `abandoned`)
- `search` (string) - Search by title or author
- `limit` (number) - Results per page
- `offset` (number) - Pagination offset

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "user_id": "user-uuid",
      "book_id": "book-uuid",
      "status": "reading",
      "rating": 4,
      "review": "Great book!",
      "progress": 65,
      "started_at": "2024-01-01T00:00:00Z",
      "finished_at": null,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "books": {
        // Full book object
      }
    }
  ]
}
```

### POST /books/user/my-books
Add book to user's library (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "book_id": "book-uuid",
  "status": "want_to_read",
  "rating": 4,
  "review": "Optional review text",
  "progress": 0
}
```

**Response (201):**
```json
{
  "data": {
    "id": "user-book-uuid",
    "user_id": "user-uuid",
    "book_id": "book-uuid",
    "status": "want_to_read",
    "rating": null,
    "review": null,
    "progress": 0,
    "started_at": null,
    "finished_at": null,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `404` - Book not found
- `409` - Book already in library
- `500` - Server error

### PUT /books/user/my-books/:id
Update user's book entry (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameters:**
- `id` (string) - User book entry UUID

**Request Body:**
```json
{
  "status": "read",
  "rating": 5,
  "review": "Excellent book!",
  "progress": 100,
  "finished_at": "2024-01-15T00:00:00Z"
}
```

**Response (200):**
```json
{
  "data": {
    // Updated user book object
  }
}
```

### DELETE /books/user/my-books/:id
Remove book from user's library (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` (string) - User book entry UUID

**Response (200):**
```json
{
  "message": "Book removed from library successfully"
}
```

## Moods Endpoints

### GET /moods
Get list of available moods for recommendations.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Adventurous",
      "description": "Ready for excitement and new experiences",
      "icon": "🗺️",
      "color": "#FF6B6B",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### POST /moods/recommendations
Get personalized book recommendations based on mood (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "mood_id": "mood-uuid"
}
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "recommendation-uuid",
      "user_id": "user-uuid",
      "book_id": "book-uuid",
      "mood_id": "mood-uuid",
      "recommendation_score": 0.85,
      "was_helpful": null,
      "feedback": null,
      "created_at": "2024-01-01T00:00:00Z",
      "book": {
        // Full book object
      }
    }
  ]
}
```

**Error Responses:**
- `400` - Validation error
- `404` - Mood not found
- `500` - Server error

## Error Responses

All endpoints return consistent error format:

```json
{
  "error": "Error message",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (resource already exists)
- `422` - Unprocessable Entity (validation failed)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Rate Limiting

- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Headers**: Rate limit information included in response headers

## Data Validation

### Input Validation Rules

#### Books
- `title`: Required, max 500 characters
- `author`: Required, max 255 characters
- `isbn`: Optional, valid ISBN format
- `rating`: Optional, 1-5 decimal with one place
- `status`: Required, one of: `want_to_read`, `reading`, `read`, `abandoned`
- `progress`: Optional, 0-100 integer

#### Users
- `email`: Required, valid email format
- `name`: Required, max 255 characters
- `password`: Required, min 8 characters, contains letter and number

#### Moods
- `name`: Required, max 100 characters, unique
- `description`: Optional, max 1000 characters
- `color`: Required, valid hex color code
- `icon`: Required, max 10 characters

## SDK Examples

### JavaScript (Fetch API)

```javascript
// Get books with filtering
const response = await fetch('/api/books?search=Harry&genre=Fantasy', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});
const data = await response.json();

// Add book to library
const addResponse = await fetch('/api/books/user/my-books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    book_id: 'book-uuid',
    status: 'want_to_read'
  })
});
```

### React Hook Example

```javascript
import { useState, useEffect } from 'react';

function useBooks(filters = {}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`/api/books?${params}`);
        const data = await response.json();
        setBooks(data.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [JSON.stringify(filters)]);

  return { books, loading };
}
```

## Testing

### Local Development
```bash
# Start API server
cd api
npm run dev

# Run tests
npm test
```

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit with your credentials
vim .env
```

## Changelog

### v1.0.0
- Initial API release
- Authentication endpoints
- Book management endpoints
- Mood-based recommendations
- Rate limiting and security

---

**Last Updated**: Current Date  
**API Version**: v1.0.0  
**Documentation Version**: 1.0
