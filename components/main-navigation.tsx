"use client"

import { Newspaper, Power, SendToBack, Snowflake, User } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image"
import { LangToggle } from "./lang-toggle"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Navigation } from "@/components/ui/design-system/navigation"
import { usePathname } from "next/navigation"

export const MainNavigation = () => {
  const pathname = usePathname()
  const session = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: "http://localhost:3000" })
  }

  const handleSignIn = () => {
    signIn("keycloak", { callbackUrl: "http://localhost:3000/freezes" });
  };


  return (
    <Navigation>
      <div className="hidden w-full sm:flex flex-row justify-center py-4 lg:py-8">
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
      <Navigation.List>
        <Link href="/freezes">
          <Navigation.Item active={pathname.includes("/freezes")}>
            <Snowflake className="mr-1 h-4" />
            <span className="hidden lg:block">Freezes</span>
          </Navigation.Item>
        </Link>
        <Link href="/event-journal">
          <Navigation.Item active={pathname.includes("/event-journal")}>
            <Newspaper className="mr-1 h-4" />
            <span className="hidden lg:block">Event journal</span>
          </Navigation.Item>
        </Link>
        <Link href="/sma">
          <Navigation.Item active={pathname.includes("/sma")}>
            <SendToBack className="mr-1 h-4" />
            <span className="hidden lg:block">SMA</span>
          </Navigation.Item>
        </Link>
      </Navigation.List>
      <Navigation.List className="hidden h-full gap-2 sm:flex flex-col items-center justify-end lg:flex-row lg:justify-center lg:items-end w-full">
        <Navigation.Item asChild>
          <ModeToggle />
        </Navigation.Item>
        <Navigation.Item asChild>
          <LangToggle />
        </Navigation.Item>
        {session ?
          <Navigation.Item onClick={handleSignOut} className="h-9 text-primary" variant="ghost">
            <Power className="h-4 w-4" />
          </Navigation.Item>
          :
          <Navigation.Item onClick={handleSignIn} className="h-9 text-primary" variant="ghost">
            <User className="h-4 w-4" />
          </Navigation.Item>
        }
      </Navigation.List>
    </Navigation>
  )
}