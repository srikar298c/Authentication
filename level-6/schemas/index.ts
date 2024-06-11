import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  // Uncomment and add validations for password-related fields if needed
  // password: z.string().min(6).optional(),
  // newPassword: z.string().min(6).optional(),
  // role: z.enum([UserRole.ADMIN, UserRole.USER]).optional(),
  // isTwoFactorEnabled: z.boolean().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string({ message: "Password is required" }),
  code: z.string().optional(),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});
