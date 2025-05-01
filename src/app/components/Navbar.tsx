"use client"
import logo from "@/../public/images/grocer-go-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

import SignOutButton from "./SignOutButton";

export default function Navbar() {
  const {data: session, isPending} = useSession();

  if (isPending) return null;

  return (
    <nav className="flex w-full items-center justify-between border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={50}></Image>
        <h1 className="text-base font-bold md:text-2xl">GrocerGO</h1>
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
          <>
            <p>User: {session.user.name}</p>
            <SignOutButton />
          </>
        )}
      </div>
    </nav>
  );
}
