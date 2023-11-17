import { Newspaper, Snowflake } from "lucide-react"

import Image from "next/image"
import { KeycloakSignInButton } from "./keycloak-signin-button";
import { LangToggle } from "../lang-toggle";
import { ModeToggle } from "../mode-toggle";
import { SideNavLink } from "./side-nav-link"
import { SignOutButton } from "./signout-button";
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth/next";

export const SideNav = async () => {
    const session = await getServerSession(authConfig)

    return (
        <nav className="hidden sm:flex sticky top-0 left-0 w-16 lg:w-52 h-screen border-r flex-col items-center p-2">
            <div className="w-full flex flex-row justify-center py-4 lg:py-8">
                <Image
                    src="/42-staff-logo.svg"
                    alt="42 staff logo"
                    className="hidden dark:block"
                    width={60}
                    height={60}
                />
                <Image
                    src="/42-staff-logo-black.svg"
                    alt="42 staff logo"
                    className="block dark:hidden"
                    width={60}
                    height={60}
                />
            </div>
            <div className="flex flex-col gap-6 lg:gap-3 w-full">
                <SideNavLink href="/freezes"><Snowflake className="mr-1 h-4" /><span className="hidden lg:block">Freezes</span></SideNavLink>
                <SideNavLink href="/event-journal"><Newspaper className="mr-1 h-4" /><span className="hidden lg:block">Event journal</span></SideNavLink>
            </div>
            <div className="h-full flex flex-col justify-end">
                <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-around w-full">
                    {session ? <SignOutButton /> : <KeycloakSignInButton />}
                    <ModeToggle />
                    <LangToggle />
                </div>
            </div>
        </nav>
    )
}