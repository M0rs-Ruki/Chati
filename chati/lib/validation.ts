import { z } from "zod";

// ==========================================
// VALIDATION SCHEMAS
// ==========================================

/**
 * Password validation schema with strong requirements
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/]/,
    "Password must contain at least one special character"
  );

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .email("Invalid email format")
  .toLowerCase()
  .trim();

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .trim();

/**
 * User role validation schema
 */
export const roleSchema = z.enum(["ADMIN", "EDITOR"], {
  errorMap: () => ({ message: "Role must be either ADMIN or EDITOR" }),
});

/**
 * User status validation schema
 */
export const statusSchema = z.enum(["ACTIVE", "DISABLED"], {
  errorMap: () => ({ message: "Status must be either ACTIVE or DISABLED" }),
});

/**
 * UUID validation schema for user IDs
 */
export const userIdSchema = z.string().cuid("Invalid user ID format");

// ==========================================
// REQUEST VALIDATION SCHEMAS
// ==========================================

/**
 * Schema for creating a new user
 */
export const createUserSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
  role: roleSchema.optional().default("EDITOR"),
});

/**
 * Schema for updating a user
 */
export const updateUserSchema = z
  .object({
    email: emailSchema.optional(),
    name: nameSchema.optional(),
    role: roleSchema.optional(),
    status: statusSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

/**
 * Schema for changing password (for editors)
 */
export const changePasswordEditorSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from old password",
    path: ["newPassword"],
  });

/**
 * Schema for changing password (for admins)
 */
export const changePasswordAdminSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"],
  });

/**
 * Schema for pagination
 */
export const paginationSchema = z.object({
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
 * Schema for user list filters
 */
export const userListFiltersSchema = z.object({
  role: roleSchema.optional(),
  status: statusSchema.optional(),
  search: z.string().trim().optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "email", "name"])
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
export function validateSchema<T>(
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

/**
 * Validates data and throws an error with formatted messages if invalid
 */
export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = validateSchema(schema, data);

  if (!result.success) {
    throw new Error(result.errors.join(", "));
  }

  return result.data;
}
