import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";

export default function Navbar() {
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
      </ul>

      <div>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-900">
          Sign in
        </Button>
      </div>
    </nav>
  );
}
