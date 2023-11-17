import { Newspaper, Snowflake } from "lucide-react"

import { BottomNavLink } from "./bottom-nav-link";
import Image from "next/image"
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth/next";

export const BottomNav = async () => {
    const session = await getServerSession(authConfig)

    return (
        <nav className="w-screen py-2 fixed bottom-0 l-0 flex flex-row items-center bg-background border-t sm:hidden">
            <div className="h-full flex flex-col justify-center px-4">
                <Image
                    src="/42-staff-logo.svg"
                    alt="42 staff logo"
                    className="hidden dark:block"
                    width={32}
                    height={32}
                />
                <Image
                    src="/42-staff-logo-black.svg"
                    alt="42 staff logo"
                    className="block dark:hidden"
                    width={32}
                    height={32}
                />
            </div>
            <div className="flex flex-row items-end gap-3">
                <BottomNavLink href="/freezes">
                    <div className="flex flex-col items-center justify-between">
                        <Snowflake className="h-4" />
                        <div className="text-[10px]">Freezes</div>
                    </div>
                </BottomNavLink>
                <BottomNavLink href="/event-journal">
                    <div className="flex flex-col items-center">
                        <Newspaper className="h-4" />
                        <div className="text-[10px]">Event journal</div>
                    </div>
                </BottomNavLink>
            </div>
        </nav>
    )
}
