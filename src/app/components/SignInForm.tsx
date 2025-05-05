"use client";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import SignInImage from "@/../public/images/sign-up-image.png";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signInFormSchema } from "@/lib/auth-schema";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/app/components/ui/form";


export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange"
  });

  const {formState: {isSubmitting, isValid}} = form;
  const disabled = !isValid || isSubmitting;

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    const { email, password } = values;

    // sign in with credentials
    signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          toast("Please wait...");
        },
        onSuccess: () => {
          toast("Sign-in successful!");
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
    <div className="flex size-full">
      <div className="w-1/2 flex justify-center px-12 py-8">
        <Form {...form}>
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
            <div className="text-center flex flex-col items-center justify-center gap-4">
              <div className="border p-2 rounded-md text-sm max-w-sm text-black/80 text-start">
                <span className="text-[#F76129]">Note:</span> GrocerGO is
                currently only available to <br /> University of Florida
                students with a valid ufl email.
              </div>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="your@ufl.edu"
                      />
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
                        {...field}
                        type="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={disabled} className="w-full disabled:opacity-50 disabled:cursor-not-allowed" >
                Sign In
              </Button>
            </div>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </form>
        </Form>
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
      {/* <div className="w-1/2 bg-red-500">box 1</div>
      <div className="w-1/2 bg-blue-500">box 2</div> */}
    </div>
  );
}
