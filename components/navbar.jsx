"use client"
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./dark-mode-toggle";

function NavBar() {
  return (
    <>
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:border-zinc-800">
      <div className="container flex items-center justify-between">
        <div className="hidden md:flex">
          <img 
            src="/logo.svg"
            className="flex items-center"  // Aangepaste breedte, hoogte behouden
            alt="Logo"
            href="/"
            width={80}
          />
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col md:flex-row">
            <NavigationMenuItem>
              <Link href="/docs" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  New Releases
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Top
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle/>
      </div>
    </div>
    </>
  );
}

export default NavBar;
