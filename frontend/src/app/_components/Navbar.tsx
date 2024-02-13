"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between border-b px-4 py-2">
        <Link href="/" className="font-bold">
          FARMWARE
        </Link>
        <div>
          <Button>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </nav>
    </>
  );
}
