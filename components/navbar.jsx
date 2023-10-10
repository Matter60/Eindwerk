"use client";

import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function NavBar() {
    return (
        <div className="hidden lg:block supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:border-zinc-800">
            <div className="container flex h-14 center-items">
                    <div className="mr-4 hidden md:flex">
                        <img
                            src="/logo.svg" 
                            width={100}
                            height={100}
                            href="/"
                        />
                    </div>
                    <NavigationMenu>
                        <NavigationMenuList>
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
    )
}

export default NavBar;
