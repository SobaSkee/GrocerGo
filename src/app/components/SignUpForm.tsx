"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/app/components/ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import signUpImage from "@/../public/images/sign-up-image.png";
import { signUp } from "@/lib/auth-client";
import { Check, X } from "lucide-react";
//import { formSchema } from "@/lib/auth-schema";
import { toast } from "sonner";

const formSchema = z
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

type FormSchema = z.infer<typeof formSchema>;

const ValidationItem = ({
  valid,
  children,
}: {
  valid: boolean;
  children: string;
}) => (
  <div className="flex items-center gap-2 text-sm">
    {valid ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-red-500" />
    )}
    <span className={valid ? "text-green-500" : "text-red-500"}>
      {children}
    </span>
  </div>
);

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = form;

  const password = watch("password") ?? "";
  const pwCriteria = {
    minLen: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    num: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };

  const onSubmit = async ({ name, email, password }: FormSchema) => {
    const avatarUrl =
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}` +
      `&background=random&color=fff&bold=true&size=128`;

    signUp.email(
      { email, password, name, image: avatarUrl },
      {
        onRequest: () => toast("Please wait..."),
        onSuccess: () => {
          toast.success("Sign‑up successful!");
          router.replace("/order");
        },
        onError: (ctx) => toast.error(ctx.error.message),
      }
    );
  };

  return (
    <div className="flex size-full">
      <div className="w-1/2 flex justify-center px-12 py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-lg space-y-6"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold">Sign up to GrocerGO</h1>
            </div>
            <div className="text-center flex flex-col items-center justify-center gap-4">
              <div className="border p-2 rounded-md text-sm max-w-sm text-black/80 text-start">
                <span className="text-[#F76129]">Note:</span> GrocerGO is
                currently only available to <br /> University of Florida
                students with a valid ufl email.
              </div>
            </div>

            {/* Field */}
            <div className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Albert Gator" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@ufl.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="Password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />

                    {/* Live Check */}
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                      <ValidationItem valid={pwCriteria.minLen}>
                        Minimum 8 characters
                      </ValidationItem>
                      <ValidationItem valid={pwCriteria.lower}>
                        One lowercase letter
                      </ValidationItem>
                      <ValidationItem valid={pwCriteria.upper}>
                        One uppercase letter
                      </ValidationItem>
                      <ValidationItem valid={pwCriteria.num}>
                        One number
                      </ValidationItem>
                      <ValidationItem valid={pwCriteria.special}>
                        One special character
                      </ValidationItem>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                !Object.values(pwCriteria).every(Boolean) || isSubmitting
              }
            >
              Sign Up
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>

      <div className="relative w-1/2">
        <Image
          src={signUpImage}
          alt="Groceries"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
