import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .refine((val) => val.endsWith("@ufl.edu"), {
      message: "Email must be a @ufl.edu email",
    }),
  password: z.string().min(8, "Password must have 8 or more characters"),
  confirmPassword: z.string().min(8, "Password confirmation is required"),
});

export const signInFormSchema = formSchema.pick({
  email: true,
  password: true,
});
