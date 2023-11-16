import Image from "next/image";
import { KeycloakSignInButton } from "./keycloak-signin-button";
import { ModeToggle } from "../mode-toggle";
import { NavigationLink } from "./navigation-link";
import { SignOutButton } from "./signout-button";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function MainNavigation() {
    const session = await getServerSession(authConfig)
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
            <div className="container flex h-14 items-center">
                <nav className="flex justify-between w-full">
                    <div className="flex justify-start items-center space-x-4 lg:space-x-6">
                        <div>
                            <Image
                                src="/42-staff-logo.svg"
                                alt="42 staff logo"
                                className="hidden rounded-full dark:block"
                                width={32}
                                height={32}
                            />
                            <Image
                                src="/42-staff-logo-black.svg"
                                alt="42 staff logo"
                                className="block rounded-full dark:hidden"
                                width={32}
                                height={32}
                            />
                        </div>
                        <NavigationLink href="/">Home</NavigationLink>
                        <NavigationLink href="/freezes">Freezes</NavigationLink>
                        <NavigationLink href="/event-journal">Event Journal</NavigationLink>
                    </div>
                    <div className="flex justify-normal items-start space-x-4 lg:space-x-6">
                        <ModeToggle />
                        {session ? <SignOutButton /> : <KeycloakSignInButton />}
                    </div>
                </nav>
            </div>
        </header>
    )
}
