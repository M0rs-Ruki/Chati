import { z } from "zod";

// ==========================================
// MEDIA TYPES
// ==========================================

export interface MediaFile {
  id: string;
  url: string;
  alt: string;
  type: string;
  size: number;
  uploadedAt: Date;
  createdBy?: {
    id: string;
    name: string | null;
    email: string;
  };
}

// ==========================================
// VALIDATION SCHEMAS
// ==========================================

/**
 * Schema for media upload validation
 */
export const mediaUploadSchema = z.object({
  alt: z
    .string()
    .min(1, "Alt text is required for accessibility")
    .max(500, "Alt text must be less than 500 characters")
    .trim(),
});

/**
 * Schema for media update validation
 */
export const mediaUpdateSchema = z.object({
  alt: z
    .string()
    .min(1, "Alt text is required")
    .max(500, "Alt text must be less than 500 characters")
    .trim(),
});

/**
 * Schema for media query parameters
 */
export const mediaQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  type: z.string().optional(),
  search: z.string().optional(),
});

// ==========================================
// CONSTANTS
// ==========================================

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

/**
 * File signature validation (magic numbers) to prevent MIME type spoofing
 */
export const FILE_SIGNATURES: Record<string, number[][]> = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47]],
  "image/gif": [[0x47, 0x49, 0x46, 0x38]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Validates file signature (magic numbers) to prevent MIME type spoofing
 */
export function validateFileSignature(
  buffer: Buffer,
  mimeType: string
): boolean {
  const signatures = FILE_SIGNATURES[mimeType];
  if (!signatures) return true; // Skip validation for types without signatures

  return signatures.some((signature) =>
    signature.every((byte, index) => buffer[index] === byte)
  );
}

/**
 * Sanitizes filename to prevent path traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "-") // Replace special chars
    .replace(/\.+/g, ".") // Remove multiple dots
    .replace(/^\./, "") // Remove leading dot
    .slice(0, 100); // Limit length
}

/**
 * Extracts Cloudinary public ID from URL
 * URL format: https://res.cloudinary.com/<cloud>/image/upload/v<version>/<folder>/<publicId>.<ext>
 */
export function extractCloudinaryPublicId(url: string): string | null {
  try {
    const urlParts = url.split("/");
    const uploadIndex = urlParts.indexOf("upload");
    if (uploadIndex !== -1 && urlParts.length > uploadIndex + 1) {
      // Skip version if present (starts with 'v' followed by numbers)
      let startIndex = uploadIndex + 1;
      if (urlParts[startIndex].match(/^v\d+$/)) {
        startIndex++;
      }
      // Get everything after 'upload/' (or version) and before the extension
      const pathAfterUpload = urlParts.slice(startIndex).join("/");
      return pathAfterUpload.replace(/\.[^/.]+$/, ""); // Remove extension
    }
    return null;
  } catch (error) {
    console.error("[CLOUDINARY_ID_EXTRACTION_ERROR]", error);
    return null;
  }
}

/**
 * Formats file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
