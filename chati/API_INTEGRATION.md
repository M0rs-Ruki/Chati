# Page API Integration Documentation

This document describes how the Page management system integrates with the backend API.

## Overview

The Page management system provides a complete CRUD (Create, Read, Update, Delete) interface for managing website pages with a drag-and-drop page builder. All operations are connected to the RESTful API endpoints.

## API Endpoints

All page-related API endpoints are located in `/app/api/page/`:

- **GET** `/api/page` - List all pages (with pagination)
- **GET** `/api/page/[id]` - Get a specific page by ID
- **POST** `/api/page/create` - Create a new page
- **PUT** `/api/page/[id]` - Update an existing page
- **DELETE** `/api/page/[id]/delete` - Delete a page

## Frontend Integration

### 1. Create Page (`/dashboard/pages/create`)

**Location:** `/app/(admin)/dashboard/pages/create/page.tsx`

**API Endpoint:** `POST /api/page/create`

**Request Body:**
```typescript
{
  title: string,              // Required, 1-200 characters
  content: {                  // Optional, JSON object with blocks
    blocks: Array<{
      id: string,
      type: string,
      data: Record<string, any>
    }>
  },
  metadata: {                 // Optional
    description: string,
    keywords: string[],
    tags: string[]
  },
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"  // Default: DRAFT
}
```

**Response (201 Created):**
```typescript
{
  message: "Page created successfully",
  data: {
    id: string,
    slug: string,              // Auto-generated from title
    title: string,
    content: { blocks: [...] },
    metadata: { ... },
    status: string,
    publishedAt: string | null,
    authorId: string,
    author: {
      id: string,
      name: string,
      email: string
    },
    createdAt: string,
    updatedAt: string
  }
}
```

**Error Handling:**
- `401 Unauthorized` - User not authenticated
- `403 Forbidden` - User doesn't have permission (requires ADMIN or EDITOR role)
- `409 Conflict` - Duplicate slug (page with similar title exists)
- `429 Too Many Requests` - Rate limit exceeded (10 requests per hour)
- `400 Bad Request` - Validation errors

**Features:**
- Auto-generates URL-friendly slug from title
- Prevents duplicate slugs
- Drag-and-drop page builder
- Real-time preview
- Status management (Draft, Review, Published)
- SEO metadata support

---

### 2. List Pages (`/dashboard/pages`)

**Location:** `/app/(admin)/dashboard/pages/page.tsx`

**API Endpoint:** `GET /api/page`

**Query Parameters:**
```typescript
{
  page?: number,        // Default: 1
  limit?: number,       // Default: 10, max: 100
  status?: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED",
  search?: string,      // Searches in title and slug
  sortBy?: "createdAt" | "updatedAt" | "title" | "publishedAt",
  sortOrder?: "asc" | "desc"
}
```

**Response (200 OK):**
```typescript
{
  message: "Pages fetched successfully",
  data: Array<{
    id: string,
    slug: string,
    title: string,
    status: string,
    publishedAt: string | null,
    author: {
      id: string,
      name: string,
      email: string
    },
    createdAt: string,
    updatedAt: string
  }>,
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasMore: boolean
  }
}
```

**Features:**
- Pagination support
- Filter by status
- Search functionality
- Sortable columns
- Bulk actions (future enhancement)

---

### 3. Edit Page (`/dashboard/pages/[id]/edit`)

**Location:** `/app/(admin)/dashboard/pages/[id]/edit/page.tsx`

**API Endpoints:**
- **GET** `/api/page/[id]` - Fetch page data
- **PUT** `/api/page/[id]` - Update page

**Fetch Request:** `GET /api/page/[id]`

**Response (200 OK):**
```typescript
{
  message: "Page fetched successfully",
  data: {
    id: string,
    slug: string,
    title: string,
    content: { blocks: [...] },
    metadata: {
      description: string,
      keywords: string[],
      tags: string[]
    },
    status: string,
    publishedAt: string | null,
    authorId: string,
    author: {
      id: string,
      name: string,
      email: string
    },
    createdAt: string,
    updatedAt: string
  }
}
```

**Update Request:** `PUT /api/page/[id]`

**Request Body:**
```typescript
{
  title?: string,           // Optional, 1-200 characters
  slug?: string,            // Optional, must be unique
  content?: {               // Optional
    blocks: Array<any>
  },
  metadata?: {              // Optional
    description?: string,
    keywords?: string[],
    tags?: string[]
  },
  status?: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"
}
```

**Note:** At least one field must be provided.

**Response (200 OK):**
```typescript
{
  message: "Page updated successfully",
  data: { /* Updated page object */ }
}
```

**Error Handling:**
- `401 Unauthorized` - User not authenticated
- `403 Forbidden` - User doesn't have permission
- `404 Not Found` - Page doesn't exist
- `409 Conflict` - Duplicate slug
- `429 Too Many Requests` - Rate limit exceeded (20 requests per 15 minutes)

**Features:**
- Load existing page data
- Edit all page properties
- Real-time content updates with page builder
- Auto-save (can be enabled)
- Preview before publishing

---

### 4. Preview Page (`/dashboard/pages/[id]/preview`)

**Location:** `/app/(admin)/dashboard/pages/[id]/preview/page.tsx`

**API Endpoint:** `GET /api/page/[id]`

**Features:**
- Live preview of page content
- Renders all component types (hero, heading, paragraph, button, image, divider)
- Full responsive preview
- No editing capability (read-only)

---

### 5. Delete Page

**Location:** `/app/(admin)/dashboard/pages/page.tsx` (delete action)

**API Endpoint:** `DELETE /api/page/[id]/delete`

**Response (200 OK):**
```typescript
{
  message: "Page deleted successfully",
  data: {
    success: true
  }
}
```

**Error Handling:**
- `401 Unauthorized` - User not authenticated
- `403 Forbidden` - User doesn't have permission
- `404 Not Found` - Page doesn't exist
- `429 Too Many Requests` - Rate limit exceeded (5 requests per hour)

**Features:**
- Confirmation modal before deletion
- Hard delete (permanent)
- Audit logging on server side

---

## Authentication

All API requests require authentication via JWT token stored in cookies or Authorization header.

### Cookie-based Authentication (Recommended)
```typescript
fetch('/api/page/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important: Include cookies
  body: JSON.stringify(data)
})
```

### Token-based Authentication (Alternative)
```typescript
const token = localStorage.getItem('token')
fetch('/api/page', {
  method: 'GET',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

## Authorization

**Permissions:**
- **ADMIN**: Full access to all page operations
- **EDITOR**: Full access to all page operations
- **Public**: Can only read published pages (not implemented in admin panel)

## Rate Limits

| Operation | Rate Limit | Window |
|-----------|------------|--------|
| List Pages | 100 requests | 15 minutes |
| Get Page | No limit (public) | - |
| Create Page | 10 requests | 1 hour |
| Update Page | 20 requests | 15 minutes |
| Delete Page | 5 requests | 1 hour |

## Error Response Format

All errors follow a consistent format:

```typescript
{
  message: string,           // Human-readable error message
  errors?: string[]          // Array of detailed error messages (validation errors)
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (authenticated but no permission)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Page Builder Components

The page builder supports the following component types:

1. **Hero**
   - title: string
   - subtitle: string
   - buttonText: string

2. **Heading**
   - level: "h1" | "h2" | "h3" | "h4"
   - text: string

3. **Paragraph**
   - text: string

4. **Button**
   - text: string
   - url: string
   - style: string

5. **Image**
   - src: string (URL)
   - alt: string

6. **Divider**
   - style: string

## SEO Metadata

Pages support comprehensive SEO metadata:

```typescript
metadata: {
  description: string,      // Meta description (recommended 150-160 chars)
  keywords: string[],       // SEO keywords
  tags: string[]           // Content tags for categorization
}
```

## Slug Generation

Slugs are automatically generated from page titles using the following rules:

1. Convert to lowercase
2. Remove special characters (keep alphanumeric and hyphens)
3. Replace spaces with hyphens
4. Remove multiple consecutive hyphens
5. Remove leading/trailing hyphens

**Example:**
- Title: "My Amazing Page! 🚀"
- Generated Slug: "my-amazing-page"

## Publishing Workflow

1. **DRAFT** - Initial state, not visible to public
2. **REVIEW** - Ready for review by editors/admins
3. **PUBLISHED** - Live and visible to public
4. **ARCHIVED** - Hidden but kept in database

When a page is published, the `publishedAt` timestamp is automatically set.

## Future Enhancements

- [ ] Auto-save functionality
- [ ] Version history
- [ ] Page templates
- [ ] Bulk operations
- [ ] Page duplication
- [ ] Scheduled publishing
- [ ] Multi-language support
- [ ] Media library integration
- [ ] Advanced SEO tools
- [ ] Analytics integration

## Troubleshooting

### "Unauthorized" Error
- Ensure user is logged in
- Check if JWT token is valid
- Verify cookies are being sent with requests

### "Duplicate Slug" Error
- Try a different page title
- Manually edit the slug to make it unique

### "Rate Limit Exceeded" Error
- Wait for the rate limit window to reset
- Check if there are multiple requests being sent unintentionally

### Page Not Loading
- Verify the page ID is correct
- Check browser console for network errors
- Ensure API endpoints are running

## Development

### Testing API Endpoints

You can test the API endpoints using curl:

```bash
# List pages
curl -X GET "http://localhost:3000/api/page?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get specific page
curl -X GET "http://localhost:3000/api/page/PAGE_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create page
curl -X POST "http://localhost:3000/api/page/create" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Page",
    "content": {"blocks": []},
    "status": "DRAFT"
  }'

# Update page
curl -X PUT "http://localhost:3000/api/page/PAGE_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "status": "PUBLISHED"
  }'

# Delete page
curl -X DELETE "http://localhost:3000/api/page/PAGE_ID/delete" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Local Development Setup

1. Ensure database is running
2. Run migrations: `npx prisma migrate dev`
3. Start development server: `npm run dev`
4. Navigate to `/dashboard/pages`

## Support

For issues or questions, please refer to:
- Main API documentation: `API_ENDPOINTS.md`
- Page validation schemas: `/lib/page-validation.ts`
- Page types: `/lib/page-types.ts`
