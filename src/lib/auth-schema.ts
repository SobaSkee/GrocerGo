import { z } from "zod";

// 1) Base object: only the raw fields you want shared
const baseUser = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .min(1, "Email is required")
    .max(50)
    .email("Invalid email")
    .refine((val) => val.endsWith("@ufl.edu"), {
      message: "Email must be a @ufl.edu address",
    }),
  password: z
    .string()
    .min(8, "Password must have 8 or more characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
});

// 2) Sign-up form schema: extends baseUser, adds confirmPassword + refine
export const signUpFormSchema = baseUser
  .extend({
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// 3) Sign-in form schema: pick email & password directly from baseUser
export const signInFormSchema = z.object({
  // re-use your existing email rules:
  email: baseUser.shape.email,
  // override password to only require a value (no complexity checks)
  password: z.string().min(1, "Password is required"),
});

export type SignUpForm = z.infer<typeof signUpFormSchema>;
export type SignInForm = z.infer<typeof signInFormSchema>;
