import { z } from "zod";

// Color validation (hex format)
const hexColorSchema = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color (e.g., #FF5733 or #F57)")
  .trim();

// URL validation
const urlSchema = z
  .string()
  .url("Must be a valid URL")
  .trim()
  .nullable()
  .optional();

// Name validation
const themeNameSchema = z
  .string()
  .min(1, "Theme name is required")
  .max(100, "Theme name must be at most 100 characters")
  .trim();

// Typography validation (JSON string)
const typographySchema = z
  .string()
  .refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Typography must be valid JSON" }
  )
  .nullable()
  .optional();

// Create theme schema
export const createThemeSchema = z.object({
  name: themeNameSchema,
  primaryColor: hexColorSchema,
  secondaryColor: hexColorSchema.nullable().optional(),
  accentColor: hexColorSchema.nullable().optional(),
  logoUrl: urlSchema,
  faviconUrl: urlSchema,
  typography: typographySchema,
});

// Update theme schema (all fields optional except at least one must be provided)
export const updateThemeSchema = z
  .object({
    name: themeNameSchema.optional(),
    primaryColor: hexColorSchema.optional(),
    secondaryColor: hexColorSchema.nullable().optional(),
    accentColor: hexColorSchema.nullable().optional(),
    logoUrl: urlSchema,
    faviconUrl: urlSchema,
    typography: typographySchema,
    isDefault: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Export types
export type CreateThemeRequest = z.infer<typeof createThemeSchema>;
export type UpdateThemeRequest = z.infer<typeof updateThemeSchema>;
