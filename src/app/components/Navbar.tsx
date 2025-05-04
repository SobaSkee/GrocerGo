"use client";
import logo from "@/../public/images/grocer-go-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { ShoppingCart, MapPin } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = useSession();

  useEffect(() => {
    console.log("Session data:", session);
  }, [session]);
  if (isPending) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white h-20 flex w-full items-center justify-between border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={50}></Image>
        <h1 className="text-base font-bold md:text-2xl">GrocerGO</h1>
      </Link>
      <div className="flex items-center gap-4">
        {/* <Link href="/order" className="text-base font-medium">
          Order
        </Link> */}
      </div>
      <div className="flex gap-2">
        {!session ? (
          <>
            <p>User is not authenticated</p>
            <Link
                href="/sign-up"
                className="transform rounded-lg bg-[#F76129] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F76129]/90 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Sign Up
              </Link>
            <Link
              href="/sign-in"
              className="w-fit transform rounded-lg px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200/50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Sign In
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            {/* <p>Welcome {session.user.name}!</p>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={`${session.user.name}’s avatar`}
                width={32}
                height={32}
                className="rounded-full"
              />
            )} */}

            <button className="px-4 py-2 flex items-center justify-center gap-2 border-2 bg-gray-100 rounded-full w-fit font-bold">
              <MapPin />
              <p>931 W University Ave.</p>
            </button>
            <button className="px-4 py-2 flex items-center justify-center gap-2 border-2 border-[#F76129] rounded-full w-fit">
              <ShoppingCart />
              <p>1</p>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
