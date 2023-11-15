"use client"

import Link from "next/link"
import { cn } from "@/app/lib/utils"
import { usePathname } from "next/navigation"

export const NavigationLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const pathname = usePathname()
    const active = href === pathname
    return (
        <Link href={href} className={cn(active && "text-foreground/70" ,"text-sm font-medium transition-colors hover:text-primary")}>
            {children}
        </Link>
    )
}