"use client";
import { useUser } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

function NavBar() {
  const { user } = useUser();
  const handleSignOut = async () => {};

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 p-2 backdrop-blur dark:border-zinc-800">
      <div className="container flex items-center justify-between">
        <div className="hidden md:flex">
          <a href="/">
            <Image
              src="/logo.svg"
              className="flex items-center dark:hidden"
              alt="Logo"
              href="/"
              width={120}
              height={80}
            />
            <Image
              src="/logo-white.svg"
              className="items-center hidden dark:block"
              alt="Logo"
              href="/"
              width={120}
              height={80}
            />
          </a>
        </div>
        <SearchBar />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <ModeToggle />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton onClick={handleSignOut}>Sign out</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button>
            <SignInButton>Sign in</SignInButton>
          </Button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
