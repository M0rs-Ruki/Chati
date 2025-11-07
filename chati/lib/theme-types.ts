import { Theme } from "@prisma/client";

// Public theme data (what gets returned in API responses)
export interface PublicThemeData {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string | null;
  accentColor: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  typography: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create theme request
export interface CreateThemeRequest {
  name: string;
  primaryColor: string;
  secondaryColor?: string | null;
  accentColor?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  typography?: string | null;
}

// Update theme request
export interface UpdateThemeRequest {
  name?: string;
  primaryColor?: string;
  secondaryColor?: string | null;
  accentColor?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  typography?: string | null;
  isDefault?: boolean;
}

// API Response types
export interface ApiResponse<T> {
  message: string;
  data?: T;
}

export interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// Helper to convert Prisma Theme to PublicThemeData
export function toPublicThemeData(theme: Theme): PublicThemeData {
  return {
    id: theme.id,
    name: theme.name,
    primaryColor: theme.primaryColor,
    secondaryColor: theme.secondaryColor,
    accentColor: theme.accentColor,
    logoUrl: theme.logoUrl,
    faviconUrl: theme.faviconUrl,
    typography: theme.typography,
    isDefault: theme.isDefault,
    createdAt: theme.createdAt,
    updatedAt: theme.updatedAt,
  };
}
