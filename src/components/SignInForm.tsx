"use client";

import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import GoogleSignInButton from "@/components/GoogleSignInButton";
import Link from "next/link";
import SignInImage from "@/../public/images/sign-up-image.png";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .refine((val) => val.endsWith("@ufl.edu"), {
      message: "Email must be valid @ufl.edu address",
    }),
  password: z.string().min(8, "Password must have more than 8 characters"),
});

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen">

      <div className="w-1/2 flex items-center justify-center px-12">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("w-full max-w-md space-y-8", className)}
          {...props}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold">Sign in to GrocerGO</h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Enter your details to sign in to your account
            </p>
          </div>
          <div className="border p-2 rounded-md text-lg text-black/80">
            <span className="text-[#F76129]">Note:</span> GrocerGO is currently
            only available to University of Florida students with a valid ufl
            email.
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@ufl.edu"
                required
                {...form.register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                {...form.register("password")}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t after:border-border">
              <span className="bg-background px-2 relative z-10 text-muted-foreground">
                Or continue with
              </span>
            </div>

            <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
          </div>

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <div className="relative w-1/2">
        <Image
          src={SignInImage}
          alt="Groceries"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
