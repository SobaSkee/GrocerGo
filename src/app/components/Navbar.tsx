"use client";
import logo from "@/../public/images/grocer-go-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

import SignOutButton from "./SignOutButton";

export default function Navbar() {
  const { data: session, isPending } = useSession();

  useEffect(() => {
    console.log("Session data:", session);
  }, [session]);
  if (isPending) return null;

  return (
    <nav className="flex w-full items-center justify-between border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={50}></Image>
        <h1 className="text-base font-bold md:text-2xl">GrocerGO</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/order" className="text-base font-medium">
          Order
        </Link>

      </div>
      <div className="flex gap-2">
        {!session ? (
          <>
            <p>User is not authenticated</p>
            <Link
              href="/sign-in"
              className="w-fit transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="w-fit transform rounded-lg px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200/50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            {/*
              If the user has an `image` URL, render it as a circle
              You can adjust width/height to taste (e.g. 32×32)
            */}
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={`${session.user.name}’s avatar`}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}

            <span className="font-medium">{session.user.name}</span>
            <SignOutButton />
          </div>
        )}
      </div>
    </nav>
  );
}
