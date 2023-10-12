"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./dark-mode-toggle";
import Image from "next/image";

function NavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 p-2 backdrop-blur dark:border-zinc-800">
      <div className="container flex items-center justify-between">
        <div className="hidden md:flex">
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
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  New releases
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Top
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </div>
  );
}

export default NavBar;
