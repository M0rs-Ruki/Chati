import { PublishStatus } from "@prisma/client";

// ==========================================
// PAGE TYPES
// ==========================================

/**
 * Public page data (safe to expose in API responses)
 */
export interface PublicPageData {
  id: string;
  slug: string;
  title: string;
  content: any; // JSON
  metadata: any; // JSON
  status: PublishStatus;
  publishedAt: Date | null;
  authorId: string | null;
  author?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Page data for list responses (minimal data)
 */
export interface PageListItem {
  id: string;
  slug: string;
  title: string;
  status: PublishStatus;
  publishedAt: Date | null;
  author?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// REQUEST TYPES
// ==========================================

/**
 * Create page request body
 */
export interface CreatePageRequest {
  title: string;
  content?: {
    blocks?: any[];
    [key: string]: any;
  };
  metadata?: {
    description?: string;
    keywords?: string[];
    tags?: string[];
    [key: string]: any;
  };
  status?: PublishStatus;
}

/**
 * Update page request body
 */
export interface UpdatePageRequest {
  title?: string;
  slug?: string;
  content?: {
    blocks?: any[];
    [key: string]: any;
  };
  metadata?: {
    description?: string;
    keywords?: string[];
    tags?: string[];
    [key: string]: any;
  };
  status?: PublishStatus;
}

/**
 * Page list query parameters
 */
export interface PageListQuery {
  page?: number;
  limit?: number;
  status?: PublishStatus;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "title" | "publishedAt";
  sortOrder?: "asc" | "desc";
}

// ==========================================
// RESPONSE TYPES
// ==========================================

/**
 * Standard API response wrapper
 */
export interface ApiPageResponse<T = unknown> {
  message: string;
  data?: T;
  errors?: string[];
}

/**
 * Paginated response
 */
export interface PaginatedPageResponse<T> {
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Page creation response
 */
export interface CreatePageResponse extends ApiPageResponse<PublicPageData> {}

/**
 * Page update response
 */
export interface UpdatePageResponse extends ApiPageResponse<PublicPageData> {}

/**
 * Page detail response
 */
export interface GetPageResponse extends ApiPageResponse<PublicPageData> {}

/**
 * Page list response
 */
export interface GetPagesResponse extends PaginatedPageResponse<PageListItem> {}

/**
 * Page deletion response
 */
export interface DeletePageResponse extends ApiPageResponse<{ success: boolean }> {}
