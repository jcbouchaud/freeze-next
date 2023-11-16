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
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    {session ? <SignOutButton /> : <KeycloakSignInButton />}
                    <ModeToggle />
                    <NavigationLink href="/">Home</NavigationLink>
                    <NavigationLink href="/freezes">Freezes</NavigationLink>
                </nav>
            </div>
        </header>
    )
}
