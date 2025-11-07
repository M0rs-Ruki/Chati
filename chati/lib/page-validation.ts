import { z } from "zod";

// ==========================================
// PAGE VALIDATION SCHEMAS
// ==========================================

/**
 * Slug validation schema
 */
export const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(200, "Slug must be less than 200 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase letters, numbers, and hyphens only"
  );

/**
 * Title validation schema
 */
export const titleSchema = z
  .string()
  .min(1, "Title is required")
  .max(200, "Title must be less than 200 characters")
  .trim();

/**
 * Content validation schema (JSON)
 */
export const contentSchema = z.object({
  blocks: z.array(z.any()).optional().default([]),
}).passthrough(); // Allow additional properties

/**
 * Metadata validation schema (JSON)
 */
export const metadataSchema = z.object({
  description: z.string().optional().default(""),
  keywords: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
}).passthrough(); // Allow additional properties

/**
 * Page status validation schema
 */
export const pageStatusSchema = z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"], {
  errorMap: () => ({ message: "Status must be DRAFT, REVIEW, PUBLISHED, or ARCHIVED" }),
});

/**
 * Page ID validation schema (CUID)
 */
export const pageIdSchema = z.string().cuid("Invalid page ID format");

// ==========================================
// REQUEST VALIDATION SCHEMAS
// ==========================================

/**
 * Schema for creating a new page
 */
export const createPageSchema = z.object({
  title: titleSchema,
  content: contentSchema.optional(),
  metadata: metadataSchema.optional(),
  status: pageStatusSchema.optional().default("DRAFT"),
});

/**
 * Schema for updating a page
 */
export const updatePageSchema = z
  .object({
    title: titleSchema.optional(),
    slug: slugSchema.optional(),
    content: contentSchema.optional(),
    metadata: metadataSchema.optional(),
    status: pageStatusSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

/**
 * Schema for pagination
 */
export const pagePaginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1)
    .catch(1),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100, "Limit cannot exceed 100")
    .default(10)
    .catch(10),
});

/**
 * Schema for page list filters
 */
export const pageListFiltersSchema = z.object({
  status: pageStatusSchema.optional(),
  search: z.string().trim().optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "title", "publishedAt"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

// ==========================================
// VALIDATION HELPER FUNCTIONS
// ==========================================

/**
 * Validates data against a schema and returns formatted errors
 */
export function validatePageSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map((err) => {
    const path = err.path.join(".");
    return path ? `${path}: ${err.message}` : err.message;
  });

  return { success: false, errors };
}
