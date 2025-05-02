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
import { formSchema } from "@/lib/auth-schema";
import { toast } from "sonner";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password, name } = values;

    const avatarUrl =
      `https://ui-avatars.com/api/` +
      `?name=${encodeURIComponent(name)}` +
      `&background=random` +
      `&color=fff` +
      `&bold=true` +
      `&size=128`;

    // sign up with credentials
    signUp.email(
      {
        email,
        password,
        name,
        image: avatarUrl,
      },
      {
        onRequest: () => {
          toast("Please wait...");
        },
        onSuccess: () => {
          toast("Sign-up successful!");
          router.push("/order");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          form.setError("email", { message: ctx.error.message });
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center px-16 py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-lg space-y-6"
          >
            <div className="text-center flex flex-col items-center justify-center gap-4">
              <h1 className="text-3xl font-bold">Sign up to GrocerGO</h1>
              <div className="border p-2 rounded-md text-lg text-black/80">
                <span className="text-[#F76129]">Note:</span> GrocerGO is
                currently only available to University of Florida students with
                a valid ufl email.
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="coolgator" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

            <Button type="submit" className="w-full">
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
