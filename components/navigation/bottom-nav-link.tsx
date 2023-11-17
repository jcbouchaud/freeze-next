"use client"

import { Button } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type SideNavLinkProps = {
    href: string;
    children: React.ReactNode;
}

export const BottomNavLink = async ({ href, children }: SideNavLinkProps) => {
    const pathname = usePathname();
    const active = pathname.includes(href)
    return (
        <Link href={href}>
            <Button variant="ghost" className={cn("text-muted-foreground lg:w-full hover:text-primary-foreground", active && "text-blue-800 font-semibold")}>{children}</Button>
        </Link>
    )
}