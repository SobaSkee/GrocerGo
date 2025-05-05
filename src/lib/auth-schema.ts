import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string(),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
      .refine((val) => val.endsWith("@ufl.edu"), {
        message: "Email must be a @ufl.edu address",
      }),

    password: z
      .string()
      .max(50)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/[0-9]/)
      .regex(/[^a-zA-Z0-9]/),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
