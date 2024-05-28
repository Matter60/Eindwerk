"use client";
import { User, LogOut, Library, LogIn } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import SearchBar from "./SearchBar";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  SignedIn,
  UserProfile,
} from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";

import Link from "next/link";
import { ThemeProvider } from "./theme-provider";

function NavBar() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 p-2 backdrop-blur dark:border-zinc-800">
      <div className="container flex items-center justify-between">
        <div className="hidden md:flex">
          <a href="/">
            <Image
              src="/logo.svg"
              className="flex items-center dark:hidden"
              alt="Logo"
              width={120}
              height={80}
              priority={true}
            />
            <Image
              src="/logo-white.svg"
              className="items-center hidden dark:block"
              alt="Logo"
              width={120}
              height={80}
              priority={true}
            />
          </a>
        </div>
        <SearchBar />
        <ModeToggle className="text-[12px]" />
        {user ? (
          <DropdownMenu className="outline-none">
            <DropdownMenuTrigger>
              <UserButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-2)">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openUserProfile()}>
                <User className="mr-2 h-4 w-4" />
                {user.fullName}
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/library">
                  <Library className="mr-2 h-4 w-4" />
                  <p>Library</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <SignOutButton>Log out</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button>
            <LogIn className="mr-2 h-4 w-4" />
            <SignInButton>Sign in</SignInButton>
          </Button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
