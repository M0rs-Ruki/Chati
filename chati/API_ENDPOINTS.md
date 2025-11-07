# 🚀 Complete API Endpoints Documentation

**Base URL:** `https://your-domain.com/api`

---

## 📑 Table of Contents
1. [Authentication Endpoints](#1-authentication-endpoints)
2. [User Endpoints](#2-user-endpoints)
3. [Page Endpoints](#3-page-endpoints)
4. [Blog Endpoints](#4-blog-endpoints)
5. [Documentation Endpoints](#5-documentation-endpoints)
6. [Theme Endpoints](#6-theme-endpoints)

---

## 1. Authentication Endpoints

### 1.1 Register User
**POST** `/api/auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "name": "John Doe",           // Required, 2-100 characters
  "email": "john@example.com",  // Required, valid email format
  "password": "SecureP@ss123",  // Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  "role": "EDITOR"              // Optional, values: "ADMIN" or "EDITOR", default: "EDITOR"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "clxxx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "EDITOR",
    "status": "ACTIVE"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 1.2 Login
**POST** `/api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@example.com",  // Required, valid email format
  "password": "SecureP@ss123"   // Required
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "clxxx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "EDITOR",
    "status": "ACTIVE"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Rate Limit:** 5 attempts per 15 minutes per email

---

### 1.3 Get Current User
**GET** `/api/auth/me`

**Authentication:** Required (Bearer Token)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "clxxx...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "EDITOR",
    "status": "ACTIVE"
  }
}
```

---

### 1.4 Logout
**POST** `/api/auth/logout`

**Authentication:** Required (Bearer Token)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

## 2. User Endpoints

### 2.1 List All Users
**GET** `/api/user`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Users fetched successfully",
  "data": [
    {
      "id": "clxxx...",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "EDITOR",
      "status": "ACTIVE",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z"
    }
  ]
}
```

**Rate Limit:** 100 requests per 15 minutes

---

### 2.2 Get User by ID
**GET** `/api/user/[id]`

**Authentication:** Required (Admin can view any, Editor can view only self)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "User fetched successfully",
  "data": {
    "id": "clxxx...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "EDITOR",
    "status": "ACTIVE",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

---

### 2.3 Create User
**POST** `/api/user/create`

**Authentication:** Required (Admin only)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "name": "Jane Smith",           // Required, 1-100 characters
  "email": "jane@example.com",    // Required, valid email, must be unique
  "password": "StrongP@ss456",    // Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  "role": "EDITOR",               // Optional, only "EDITOR" allowed (admins cannot create other admins)
  "status": "ACTIVE"              // Optional, values: "ACTIVE" or "DISABLED", default: "ACTIVE"
}
```

**Important:** Admins can ONLY create EDITOR accounts, not other ADMIN accounts.

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "data": {
    "id": "clyyy...",
    "email": "jane@example.com",
    "name": "Jane Smith",
    "role": "EDITOR",
    "status": "ACTIVE",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour

---

### 2.4 Update User
**PUT** `/api/user/[id]`

**Authentication:** Required (Admin can update any editor or self, Editor can only update self)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "name": "Jane Doe",             // Optional, 1-100 characters
  "email": "jane.new@example.com", // Optional, valid email, must be unique
  "role": "ADMIN",                // Optional, Admin only (editors cannot change role)
  "status": "DISABLED"            // Optional, Admin only (editors cannot change status)
}
```

**Note:** At least one field must be provided.

**Response (200 OK):**
```json
{
  "message": "User updated successfully",
  "data": {
    "id": "clyyy...",
    "email": "jane.new@example.com",
    "name": "Jane Doe",
    "role": "EDITOR",
    "status": "ACTIVE",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

**Rate Limit:** 20 requests per 15 minutes

---

### 2.5 Change Password
**PUT** `/api/user/[id]/password`

**Authentication:** Required (Editor can change own, Admin can change any editor or self)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body (For changing own password):**
```json
{
  "oldPassword": "CurrentP@ss123",  // Required for own password
  "newPassword": "NewStrongP@ss456", // Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  "confirmPassword": "NewStrongP@ss456" // Required, must match newPassword
}
```

**Request Body (For admin changing editor's password):**
```json
{
  "newPassword": "NewStrongP@ss456", // Required
  "confirmPassword": "NewStrongP@ss456" // Required, must match newPassword
}
```

**Response (200 OK):**
```json
{
  "message": "Password changed successfully",
  "data": {
    "success": true
  }
}
```

**Rate Limit:** 3 requests per 15 minutes (strict for security)

---

### 2.6 Delete User
**DELETE** `/api/user/[id]/delete`

**Authentication:** Required (Admin can delete editors or self, Editor can delete self)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "User deleted successfully",
  "data": {
    "success": true
  }
}
```

**Rate Limit:** 5 requests per hour

---

## 3. Page Endpoints

### 3.1 List All Pages (PUBLIC)
**GET** `/api/page`

**Authentication:** Not required (Public endpoint)

**Query Parameters:**
```
page=1              // Optional, default: 1
limit=10            // Optional, default: 10, max: 100
status=PUBLISHED    // Optional, values: DRAFT, REVIEW, PUBLISHED, ARCHIVED
search=hello        // Optional, searches in title and slug
sortBy=createdAt    // Optional, values: createdAt, updatedAt, title, publishedAt, default: createdAt
sortOrder=desc      // Optional, values: asc, desc, default: desc
```

**Response (200 OK):**
```json
{
  "message": "Pages fetched successfully",
  "data": [
    {
      "id": "clxxx...",
      "slug": "my-page",
      "title": "My Page",
      "status": "PUBLISHED",
      "publishedAt": "2025-01-01T00:00:00.000Z",
      "author": {
        "id": "clyyy...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasMore": true
  }
}
```

---

### 3.2 Get Page by ID (PUBLIC)
**GET** `/api/page/[id]`

**Authentication:** Not required (Public endpoint)

**Response (200 OK):**
```json
{
  "message": "Page fetched successfully",
  "data": {
    "id": "clxxx...",
    "slug": "my-page",
    "title": "My Page",
    "content": {
      "blocks": [...]
    },
    "metadata": {
      "description": "Page description",
      "keywords": ["page", "example"],
      "tags": ["tutorial"]
    },
    "status": "PUBLISHED",
    "publishedAt": "2025-01-01T00:00:00.000Z",
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

---

### 3.3 Create Page
**POST** `/api/page/create`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "My New Page",              // Required, 1-200 characters
  "content": {                         // Optional, JSON object with blocks
    "blocks": [
      { "type": "paragraph", "data": { "text": "Content here" } }
    ]
  },
  "metadata": {                        // Optional, JSON object
    "description": "Page description",
    "keywords": ["page", "example"],
    "tags": ["tutorial"]
  },
  "status": "DRAFT"                    // Optional, values: DRAFT, REVIEW, PUBLISHED, ARCHIVED, default: DRAFT
}
```

**Important:** Slug is auto-generated from title. If a duplicate slug is detected, it returns a 409 error.

**Response (201 Created):**
```json
{
  "message": "Page created successfully",
  "data": {
    "id": "clxxx...",
    "slug": "my-new-page",
    "title": "My New Page",
    "content": { "blocks": [...] },
    "metadata": { "description": "...", "keywords": [...] },
    "status": "DRAFT",
    "publishedAt": null,
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour

---

### 3.4 Update Page
**PUT** `/api/page/[id]`

**Authentication:** Required (Admin or Editor - can update any page)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Updated Title",      // Optional, 1-200 characters
  "slug": "custom-slug",         // Optional, must be unique
  "content": {                   // Optional, JSON object
    "blocks": [...]
  },
  "metadata": {                  // Optional, JSON object
    "description": "New description"
  },
  "status": "PUBLISHED"          // Optional, values: DRAFT, REVIEW, PUBLISHED, ARCHIVED
}
```

**Note:** At least one field must be provided.

**Response (200 OK):**
```json
{
  "message": "Page updated successfully",
  "data": {
    "id": "clxxx...",
    "slug": "custom-slug",
    "title": "Updated Title",
    "content": { "blocks": [...] },
    "metadata": { "description": "New description" },
    "status": "PUBLISHED",
    "publishedAt": "2025-01-02T00:00:00.000Z",
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

**Rate Limit:** 20 requests per 15 minutes

---

### 3.5 Delete Page
**DELETE** `/api/page/[id]/delete`

**Authentication:** Required (Admin or Editor - can delete any page)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Page deleted successfully",
  "data": {
    "success": true
  }
}
```

**Rate Limit:** 5 requests per hour

---

## 4. Blog Endpoints

### 4.1 List All Blogs
**GET** `/api/blog`

**Authentication:** Not required (Public endpoint)

**Query Parameters:**
```
page=1              // Optional, default: 1
limit=10            // Optional, default: 10, max: 100
status=PUBLISHED    // Optional, values: DRAFT, REVIEW, PUBLISHED, ARCHIVED
```

**Response (200 OK):**
```json
{
  "message": "Blogs fetched successfully",
  "data": [
    {
      "id": "clxxx...",
      "slug": "my-blog-post",
      "title": "My Blog Post",
      "imageUrl": "https://example.com/image.jpg",
      "status": "PUBLISHED",
      "metadata": {
        "tags": ["tutorial", "blog"],
        "description": "Blog description"
      },
      "publishedAt": "2025-01-01T00:00:00.000Z",
      "author": {
        "id": "clyyy...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

### 4.2 Get Blog by ID
**GET** `/api/blog/[id]`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Blog fetched successfully",
  "data": {
    "id": "clxxx...",
    "slug": "my-blog-post",
    "title": "My Blog Post",
    "content": {
      "blocks": [...]
    },
    "imageUrl": "https://example.com/image.jpg",
    "metadata": {
      "tags": ["tutorial"],
      "description": "Description"
    },
    "status": "PUBLISHED",
    "publishedAt": "2025-01-01T00:00:00.000Z",
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

---

### 4.3 Create Blog
**POST** `/api/blog/create`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "My New Blog Post",         // Required, non-empty string
  "content": {                         // Required, JSON object
    "blocks": [
      { "type": "paragraph", "data": { "text": "Blog content" } }
    ]
  },
  "metadata": {                        // Optional, JSON object
    "tags": ["tutorial", "blog"],
    "description": "Blog description"
  },
  "imageUrl": "https://example.com/image.jpg"  // Optional, string or null
}
```

**Note:** Slug is auto-generated from title. If duplicate, timestamp is appended.

**Response (201 Created):**
```json
{
  "message": "Blog created successfully",
  "data": {
    "id": "clxxx...",
    "slug": "my-new-blog-post",
    "title": "My New Blog Post",
    "content": { "blocks": [...] },
    "imageUrl": "https://example.com/image.jpg",
    "metadata": { "tags": [...], "description": "..." },
    "status": "DRAFT",
    "publishedAt": null,
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 4.4 Update Blog
**PUT** `/api/blog/[id]`

**Authentication:** Required (Author or Admin only)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Updated Blog Title",       // Optional, non-empty string
  "content": {                         // Optional, JSON object
    "blocks": [...]
  },
  "metadata": {                        // Optional, JSON object
    "tags": ["updated"],
    "description": "New description"
  },
  "imageUrl": "https://example.com/new-image.jpg",  // Optional, string or null
  "status": "PUBLISHED"                // Optional, values: DRAFT, REVIEW, PUBLISHED, ARCHIVED
}
```

**Note:** Only the blog author or an admin can update the blog.

**Response (200 OK):**
```json
{
  "message": "Blog updated successfully",
  "data": {
    "id": "clxxx...",
    "slug": "my-new-blog-post",
    "title": "Updated Blog Title",
    "content": { "blocks": [...] },
    "imageUrl": "https://example.com/new-image.jpg",
    "metadata": { "tags": ["updated"] },
    "status": "PUBLISHED",
    "publishedAt": "2025-01-02T00:00:00.000Z",
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

---

### 4.5 Delete Blog
**DELETE** `/api/blog/[id]/delete`

**Authentication:** Required (Author or Admin only)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Blog deleted successfully"
}
```

---

## 5. Documentation Endpoints

### 5.1 List All Documentation
**GET** `/api/documentation`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**
```
page=1              // Optional, default: 1
limit=10            // Optional, default: 10, max: 100
status=PUBLISHED    // Optional, values: DRAFT, REVIEW, PUBLISHED, ARCHIVED
```

**Response (200 OK):**
```json
{
  "message": "Documentation fetched successfully",
  "data": [
    {
      "id": "clxxx...",
      "slug": "getting-started",
      "title": "Getting Started",
      "status": "PUBLISHED",
      "metadata": {
        "tags": ["guide"],
        "description": "Getting started guide"
      },
      "imageUrl": "https://example.com/doc-image.jpg",
      "author": {
        "id": "clyyy...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "pages": 2
  }
}
```

---

### 5.2 Get Documentation by ID
**GET** `/api/documentation/[id]`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Documentation fetched successfully",
  "data": {
    "id": "clxxx...",
    "slug": "getting-started",
    "title": "Getting Started",
    "content": {
      "blocks": [...]
    },
    "imageUrl": "https://example.com/doc-image.jpg",
    "metadata": {
      "tags": ["guide"],
      "description": "Getting started guide"
    },
    "status": "PUBLISHED",
    "publishedAt": "2025-01-01T00:00:00.000Z",
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

---

### 5.3 Create Documentation
**POST** `/api/documentation/create`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "New Documentation",        // Required, non-empty string
  "content": {                         // Required, JSON object
    "blocks": [
      { "type": "paragraph", "data": { "text": "Doc content" } }
    ]
  },
  "metadata": {                        // Optional, JSON object
    "tags": ["guide", "tutorial"],
    "description": "Documentation description"
  },
  "imageUrl": "https://example.com/doc-image.jpg"  // Optional, string or null
}
```

**Note:** Slug is auto-generated from title. If duplicate, timestamp is appended.

**Response (201 Created):**
```json
{
  "message": "Documentation created successfully",
  "data": {
    "id": "clxxx...",
    "slug": "new-documentation",
    "title": "New Documentation",
    "content": { "blocks": [...] },
    "imageUrl": "https://example.com/doc-image.jpg",
    "metadata": { "tags": [...], "description": "..." },
    "status": "DRAFT",
    "publishedAt": null,
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 5.4 Update Documentation
**PUT** `/api/documentation/[id]`

**Authentication:** Required (Author or Admin only)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Updated Documentation",    // Optional, non-empty string
  "content": {                         // Optional, JSON object
    "blocks": [...]
  },
  "metadata": {                        // Optional, JSON object
    "tags": ["updated"],
    "description": "New description"
  },
  "imageUrl": "https://example.com/new-doc-image.jpg",  // Optional, string or null
  "status": "PUBLISHED"                // Optional, values: DRAFT, REVIEW, PUBLISHED, ARCHIVED
}
```

**Response (200 OK):**
```json
{
  "message": "Documentation updated successfully",
  "data": {
    "id": "clxxx...",
    "slug": "new-documentation",
    "title": "Updated Documentation",
    "content": { "blocks": [...] },
    "imageUrl": "https://example.com/new-doc-image.jpg",
    "metadata": { "tags": ["updated"] },
    "status": "PUBLISHED",
    "publishedAt": "2025-01-02T00:00:00.000Z",
    "authorId": "clyyy...",
    "author": {
      "id": "clyyy...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

---

### 5.5 Delete Documentation
**DELETE** `/api/documentation/[id]/delete`

**Authentication:** Required (Author or Admin only)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Documentation deleted successfully"
}
```

---

## 6. Theme Endpoints

### 6.1 List All Themes
**GET** `/api/themes`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Themes fetched successfully",
  "data": [
    {
      "id": "clxxx...",
      "name": "Default Theme",
      "primaryColor": "#3B82F6",
      "secondaryColor": "#10B981",
      "accentColor": "#F59E0B",
      "logoUrl": "https://example.com/logo.png",
      "faviconUrl": "https://example.com/favicon.ico",
      "typography": "{\"fontFamily\":\"Inter\",\"fontSize\":\"16px\"}",
      "isDefault": true,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z"
    }
  ]
}
```

**Rate Limit:** 100 requests per 15 minutes

---

### 6.2 Get Theme by ID
**GET** `/api/themes/[id]`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "Theme fetched successfully",
  "data": {
    "id": "clxxx...",
    "name": "Default Theme",
    "primaryColor": "#3B82F6",
    "secondaryColor": "#10B981",
    "accentColor": "#F59E0B",
    "logoUrl": "https://example.com/logo.png",
    "faviconUrl": "https://example.com/favicon.ico",
    "typography": "{\"fontFamily\":\"Inter\",\"fontSize\":\"16px\"}",
    "isDefault": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

---

### 6.3 Create Theme
**POST** `/api/themes/create`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "name": "Dark Theme",                  // Required, 1-100 characters, must be unique
  "primaryColor": "#1E293B",             // Required, valid hex color (e.g., #FF5733 or #F57)
  "secondaryColor": "#334155",           // Optional, valid hex color or null
  "accentColor": "#F59E0B",              // Optional, valid hex color or null
  "logoUrl": "https://example.com/dark-logo.png",     // Optional, valid URL or null
  "faviconUrl": "https://example.com/dark-favicon.ico", // Optional, valid URL or null
  "typography": "{\"fontFamily\":\"Roboto\",\"fontSize\":\"16px\"}" // Optional, valid JSON string or null
}
```

**Important:** 
- The new theme is automatically set as the default theme
- All other themes will be set to `isDefault: false`
- Theme name must be unique

**Response (201 Created):**
```json
{
  "message": "Theme created successfully and set as active",
  "data": {
    "id": "clyyy...",
    "name": "Dark Theme",
    "primaryColor": "#1E293B",
    "secondaryColor": "#334155",
    "accentColor": "#F59E0B",
    "logoUrl": "https://example.com/dark-logo.png",
    "faviconUrl": "https://example.com/dark-favicon.ico",
    "typography": "{\"fontFamily\":\"Roboto\",\"fontSize\":\"16px\"}",
    "isDefault": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour

---

### 6.4 Update Theme
**PUT** `/api/themes/[id]`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "name": "Updated Dark Theme",          // Optional, 1-100 characters, must be unique
  "primaryColor": "#0F172A",             // Optional, valid hex color
  "secondaryColor": "#1E293B",           // Optional, valid hex color or null
  "accentColor": "#EAB308",              // Optional, valid hex color or null
  "logoUrl": "https://example.com/new-logo.png",     // Optional, valid URL or null
  "faviconUrl": "https://example.com/new-favicon.ico", // Optional, valid URL or null
  "typography": "{\"fontFamily\":\"Inter\",\"fontSize\":\"18px\"}", // Optional, valid JSON string or null
  "isDefault": true                      // Optional, boolean
}
```

**Note:** 
- At least one field must be provided
- If `isDefault: true`, all other themes will be set to `isDefault: false`
- If changing name, it must not conflict with existing theme names

**Response (200 OK):**
```json
{
  "message": "Theme updated successfully",
  "data": {
    "id": "clyyy...",
    "name": "Updated Dark Theme",
    "primaryColor": "#0F172A",
    "secondaryColor": "#1E293B",
    "accentColor": "#EAB308",
    "logoUrl": "https://example.com/new-logo.png",
    "faviconUrl": "https://example.com/new-favicon.ico",
    "typography": "{\"fontFamily\":\"Inter\",\"fontSize\":\"18px\"}",
    "isDefault": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

**Rate Limit:** 20 requests per 15 minutes

---

### 6.5 Delete Theme
**DELETE** `/api/themes/[id]/delete`

**Authentication:** Required (Admin or Editor)

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Important:** Cannot delete the default theme. You must set another theme as default first.

**Response (200 OK):**
```json
{
  "message": "Theme deleted successfully",
  "data": {
    "success": true
  }
}
```

**Response (409 Conflict - if trying to delete default theme):**
```json
{
  "message": "Cannot delete the default theme. Please set another theme as default first."
}
```

**Rate Limit:** 5 requests per hour

---

## 📝 Summary

### Total Endpoints: **34**

#### Authentication (4 endpoints)
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout

#### User (6 endpoints)
- GET `/api/user` - List all users
- POST `/api/user/create` - Create user (Admin only, can only create EDITORS)
- GET `/api/user/[id]` - Get user by ID
- PUT `/api/user/[id]` - Update user
- PUT `/api/user/[id]/password` - Change password
- DELETE `/api/user/[id]/delete` - Delete user

#### Page (5 endpoints)
- GET `/api/page` - List all pages (PUBLIC)
- POST `/api/page/create` - Create page (Admin or Editor)
- GET `/api/page/[id]` - Get page by ID (PUBLIC)
- PUT `/api/page/[id]` - Update page (Admin or Editor)
- DELETE `/api/page/[id]/delete` - Delete page (Admin or Editor)

#### Blog (5 endpoints)
- GET `/api/blog` - List all blogs
- POST `/api/blog/create` - Create blog (Admin or Editor)
- GET `/api/blog/[id]` - Get blog by ID
- PUT `/api/blog/[id]` - Update blog (Author or Admin)
- DELETE `/api/blog/[id]/delete` - Delete blog (Author or Admin)

#### Documentation (5 endpoints)
- GET `/api/documentation` - List all documentation
- POST `/api/documentation/create` - Create documentation (Admin or Editor)
- GET `/api/documentation/[id]` - Get documentation by ID
- PUT `/api/documentation/[id]` - Update documentation (Author or Admin)
- DELETE `/api/documentation/[id]/delete` - Delete documentation (Author or Admin)

#### Theme (5 endpoints)
- GET `/api/themes` - List all themes (Admin or Editor)
- POST `/api/themes/create` - Create theme (Admin or Editor)
- GET `/api/themes/[id]` - Get theme by ID (Admin or Editor)
- PUT `/api/themes/[id]` - Update theme (Admin or Editor)
- DELETE `/api/themes/[id]/delete` - Delete theme (Admin or Editor)

---

## 🔑 Common Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation failed, invalid input |
| 401 | Unauthorized | Missing/invalid token, wrong password |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate email/slug |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

---

**Last Updated:** November 7, 2025
