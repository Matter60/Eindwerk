"use client";
import { ModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import SearchBar from "./SearchBar";

function NavBar() {
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
      </div>
    </div>
  );
}

export default NavBar;
