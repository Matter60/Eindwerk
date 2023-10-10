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

function NavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:border-zinc-800">
      <div className="container flex items-center">
        <div className="mr-4">
          <img
            src="/logo.svg"
            className="w-24 h-16"  // Aangepaste breedte, hoogte behouden
            alt="Logo"
            href="/"
          />
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col md:flex-row md:ml-4">
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
      </div>
    </div>
  );
}

export default NavBar;
