import { Role, UserStatus } from "@prisma/client";

// ==========================================
// USER TYPES
// ==========================================

/**
 * Public user data (safe to expose in API responses)
 */
export interface PublicUserData {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User data for list responses (minimal data)
 */
export interface UserListItem {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  status: UserStatus;
  createdAt: Date;
}

// ==========================================
// REQUEST TYPES
// ==========================================

/**
 * Create user request body
 */
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: Role;
}

/**
 * Update user request body
 */
export interface UpdateUserRequest {
  email?: string;
  name?: string;
  role?: Role;
  status?: UserStatus;
}

/**
 * Change password request body (for editors)
 */
export interface ChangePasswordEditorRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Change password request body (for admins)
 */
export interface ChangePasswordAdminRequest {
  newPassword: string;
  confirmPassword: string;
}

/**
 * User list query parameters
 */
export interface UserListQuery {
  page?: number;
  limit?: number;
  role?: Role;
  status?: UserStatus;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "email" | "name";
  sortOrder?: "asc" | "desc";
}

// ==========================================
// RESPONSE TYPES
// ==========================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  errors?: string[];
}

/**
 * Error response
 */
export interface ErrorResponse {
  message: string;
  errors?: string[];
  code?: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
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
 * User creation response
 */
export interface CreateUserResponse extends ApiResponse<PublicUserData> {}

/**
 * User update response
 */
export interface UpdateUserResponse extends ApiResponse<PublicUserData> {}

/**
 * User detail response
 */
export interface GetUserResponse extends ApiResponse<PublicUserData> {}

/**
 * User list response
 */
export interface GetUsersResponse extends PaginatedResponse<UserListItem> {}

/**
 * Password change response
 */
export interface ChangePasswordResponse extends ApiResponse<{ success: boolean }> {}

/**
 * User deletion response
 */
export interface DeleteUserResponse extends ApiResponse<{ success: boolean }> {}

// ==========================================
// VALIDATION ERROR TYPES
// ==========================================

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validation error response
 */
export interface ValidationErrorResponse extends ErrorResponse {
  errors: string[];
  validationErrors?: ValidationError[];
}
