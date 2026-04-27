# Campus Exchange API

Local Express API for the Campus Exchange marketplace application.

## What It Does

This API provides endpoints for managing marketplace listings. It connects to a Supabase database and serves as the backend for the Campus Exchange frontend application.

## Prerequisites

- Node.js (v18 or higher)
- npm
- A Supabase project with the database schema set up

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `api` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
PORT=3000
CLIENT_ORIGIN=http://localhost:5173

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

To get your Supabase credentials:
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the Project URL
4. Copy the service_role key (not the anon key)

### 3. Start the API

Development mode (auto-restart on file changes):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will start on `http://localhost:3000`

## Available Routes

### Listings

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/listings` | Get all listings |
| GET | `/api/listings/:id` | Get a single listing by ID |
| GET | `/api/users/:userId/listings` | Get listings for a specific user |
| POST | `/api/listings` | Create a new listing (requires auth) |
| PATCH | `/api/listings/:id` | Update a listing (requires auth) |
| DELETE | `/api/listings/:id` | Delete a listing (requires auth) |

### Health Check

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | API health check |

## Example Requests

### Get All Listings
```bash
curl http://localhost:3000/api/listings
```

Response:
```json
{
  "listings": [
    {
      "id": 1,
      "title": "Calculus Early Transcendentals",
      "description": "Used for MATH 120",
      "price": 45.00,
      "status": "available",
      "created_at": "2024-01-15T10:30:00Z",
      "seller_id": 1,
      "category_id": 1,
      "users": {
        "id": 1,
        "full_name": "Jane Doe",
        "email": "jane.doe@example.com"
      },
      "categories": {
        "id": 1,
        "name": "Textbooks"
      }
    }
  ]
}
```

### Get Single Listing
```bash
curl http://localhost:3000/api/listings/1
```

Response:
```json
{
  "listing": {
    "id": 1,
    "title": "Calculus Early Transcendentals",
    "description": "Used for MATH 120",
    "price": 45.00,
    "status": "available",
    "created_at": "2024-01-15T10:30:00Z",
    "seller_id": 1,
    "category_id": 1,
    "users": {
      "id": 1,
      "full_name": "Jane Doe",
      "email": "jane.doe@example.com"
    },
    "categories": {
      "id": 1,
      "name": "Textbooks"
    }
  }
}
```

### Get User's Listings
```bash
curl http://localhost:3000/api/users/1/listings
```

Response:
```json
{
  "listings": [
    {
      "id": 1,
      "title": "Calculus Early Transcendentals",
      "price": 45.00,
      "status": "available",
      "categories": {
        "id": 1,
        "name": "Textbooks"
      }
    }
  ]
}
```

### Create Listing (requires authentication)
```bash
curl -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Graphing Calculator TI-84 Plus",
    "description": "Used for 2 semesters",
    "price": 75.00,
    "category_id": 1,
    "status": "available"
  }'
```

Response:
```json
{
  "listing": {
    "id": 7,
    "title": "Graphing Calculator TI-84 Plus",
    "description": "Used for 2 semesters",
    "price": 75.00,
    "status": "available",
    "created_at": "2024-01-20T14:00:00Z",
    "seller_id": 1,
    "category_id": 1,
    "categories": {
      "id": 1,
      "name": "Textbooks"
    }
  }
}
```

## Smoke Test

Run the health check to verify the API is running:

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok"
}
```

## Project Structure

```
api/
├── src/
│   ├── index.js          # Main Express server
│   ├── lib/
│   │   └── supabaseClient.js  # Supabase client configuration
│   ├── middleware/
│   │   └── auth.js       # Authentication middleware
│   └── routes/
│       ├── listings.js   # Listings endpoints
│       ├── messages.js   # Messages endpoints
│       ├── users.js      # Users endpoints
│       └── offers.js     # Offers endpoints
├── .env.example          # Environment variables template
├── package.json          # Dependencies
└── openapi.yaml          # OpenAPI specification
```

## Error Responses

All endpoints return JSON error responses:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (email not verified)
- `404` - Not Found
- `500` - Internal Server Error

## Development

The API uses:
- Express.js for the web framework
- Supabase for database operations
- CORS for cross-origin requests
- Helmet for security headers
- Morgan for HTTP request logging

For more details, see the OpenAPI specification in `openapi.yaml`.