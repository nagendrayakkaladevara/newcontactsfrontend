# API Integration

Complete guide to API integration, endpoints, and authentication.

## Base Configuration

The application connects to a REST API. Configure the base URL in your environment variables:

```env
VITE_API_BASE_URL=https://api.example.com
```

## Authentication

The application supports multiple authentication methods:

### API Key Authentication

```env
VITE_API_KEY=your_api_key_here
```

The API key is sent in the `X-API-Key` header.

### Basic Authentication

```env
VITE_API_USERNAME=your_username
VITE_API_PASSWORD=your_password
```

Credentials are sent as Basic Auth in the `Authorization` header.

## API Endpoints

### Contacts

#### Get All Contacts
```
GET /api/contacts?page={page}&limit={limit}
```
**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 50) - Items per page

**Response:**
```json
{
  "success": true,
  "data": [Contact],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1000,
    "totalPages": 20
  }
}
```

#### Search by Name
```
GET /api/contacts/search/name?query={query}&page={page}&limit={limit}
```
**Query Parameters:**
- `query` (string, required) - Search query
- `page` (number, default: 1)
- `limit` (number, default: 50)

#### Search by Phone
```
GET /api/contacts/search/phone?query={query}
```
**Query Parameters:**
- `query` (string, required) - Phone number to search

**Response:**
```json
{
  "success": true,
  "data": [
    { "date": "2025-12-23", "count": 5 },
    ...
  ],
  "period": "7 days",
  "totalVisits": 1000
}
```

#### Get Contacts Count
```
GET /api/contacts/count
```
**Response:**
```json
{
  "success": true,
  "count": 1000
}
```

### Analytics

#### Get Visit Count
```
GET /api/analytics/visits
```
**Response:**
```json
{
  "success": true,
  "data": {
    "visitCount": 5000
  }
}
```

#### Increment Visit Count
```
POST /api/analytics/visits
```
**Response:**
```json
{
  "success": true,
  "data": {
    "visitCount": 5001
  }
}
```

#### Get Visits History
```
GET /api/analytics/visits/history?days={days}
```
**Query Parameters:**
- `days` (number, default: 30) - Number of days

**Response:**
```json
{
  "success": true,
  "data": [
    { "date": "2025-12-23", "count": 5 },
    { "date": "2025-12-24", "count": 8 }
  ],
  "period": "7 days",
  "totalVisits": 1000
}
```

#### Get Analytics Overview
```
GET /api/analytics/overview
```
**Response:**
```json
{
  "success": true,
  "data": {
    "totalContacts": 1000,
    "visitCount": 5000,
    "recentContacts7Days": 50,
    "recentContacts30Days": 200,
    "contactsWithBloodGroup": 800,
    "contactsWithLobby": 900,
    "bloodGroupCoverage": "80.00",
    "lobbyCoverage": "90.00"
  }
}
```

#### Get Contact Growth
```
GET /api/analytics/growth?days={days}
```
**Query Parameters:**
- `days` (number, default: 30) - Number of days

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "7 days",
    "totalAdded": 50,
    "dailyGrowth": [
      {
        "date": "2025-12-23",
        "count": 5,
        "cumulative": 1000
      }
    ]
  }
}
```

### Documents

#### Get All Documents
```
GET /api/documents/all
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Document Title",
      "url": "https://example.com/doc.pdf"
    }
  ]
}
```

#### Get Documents Count
```
GET /api/documents/count
```
**Response:**
```json
{
  "success": true,
  "count": 25
}
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Client-Side Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Automatic retry with exponential backoff
- **Validation Errors**: User-friendly error messages
- **404 Errors**: "Not found" messaging
- **Timeout**: 30-second default timeout
- **Retry Mechanisms**: Retry buttons for failed requests

## Request Configuration

### Timeout
Default timeout is 30 seconds. Can be configured in `api-client.ts`.

### Headers
Default headers include:
- `Content-Type: application/json`
- `X-API-Key` (if configured)
- `Authorization` (if Basic Auth configured)

## Rate Limiting

If the API implements rate limiting, the client will handle:
- Rate limit errors gracefully
- User-friendly error messages
- Retry after rate limit window

## Testing API Integration

### Development
Use the development server with mock data or connect to a staging API.

### Production
Ensure all environment variables are properly configured before deployment.

