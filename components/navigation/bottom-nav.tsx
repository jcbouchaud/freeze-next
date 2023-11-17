import { Newspaper, SendToBack, Snowflake } from "lucide-react"

import { BottomNavLink } from "./bottom-nav-link";
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth/next";

export const BottomNav = async () => {
    const session = await getServerSession(authConfig)

    return (
        <nav className="w-screen py-2 fixed bottom-0 l-0 flex flex-row items-center justify-around bg-background border-t sm:hidden">
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
                <BottomNavLink href="/sma">
                    <div className="flex flex-col items-center">
                        <SendToBack className="h-4" />
                        <div className="text-[10px]">SMA</div>
                    </div>
                </BottomNavLink>
        </nav>
    )
}
