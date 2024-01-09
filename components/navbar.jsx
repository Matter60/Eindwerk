"use client";
import { useUser } from "@clerk/clerk-react";
import { ModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

function NavBar() {
  const { user } = useUser();

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 p-2 backdrop-blur dark:border-zinc-800">
      <div className="container flex items-center justify-between">
        <div className="hidden md:flex">
          <a href="/">
            <Image
              src="/logo.svg"
              className="flex items-center dark:hidden" // Aangepaste breedte, hoogte behouden
              alt="Logo"
              href="/"
              width={120}
              height={80}
            />
            <Image
              src="/logo-white.svg"
              className="items-center hidden dark:block" // Aangepaste breedte, hoogte behouden
              alt="Logo"
              href="/"
              width={120}
              height={80}
            />
          </a>
        </div>
        <SearchBar />
        <ModeToggle />

        {/* Conditional rendering for sign-in and sign-out buttons */}
        {user ? (
          <SignOutButton>Sign out</SignOutButton>
        ) : (
          <SignInButton>Sign in</SignInButton>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default NavBar;
