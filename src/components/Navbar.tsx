import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Navbar() {
  const user = auth();
  console.log(user);
  return (
    <nav className="flex items-center justify-between p-4">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Admin App</h1>
      </Link>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            About
          </Link>
        </li>
        <li>
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            Contact
          </Link>
        </li>
        {user.userId && (
          <li>
            <Link href="admin" className={buttonVariants({ variant: "link" })}>
              Admin
            </Link>
          </li>
        )}
      </ul>

      <div>
        <SignedOut>
          <Button asChild className="text-md bg-blue-600">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton showName afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>
    </nav>
  );
}
