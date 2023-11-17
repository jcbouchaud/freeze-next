"use client"

import { Button } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type SideNavLinkProps = {
    href: string;
    children: React.ReactNode;
}

export const SideNavLink = async ({ href, children }: SideNavLinkProps) => {
    const pathname = usePathname();
    const active = pathname.includes(href)
    return (
        <Link href={href}>
            <Button className={cn("w-full px-2 h-8 flex flex-row items center justify-center lg:justify-start rounded-lg bg-transparent text-muted-foreground lg:w-full hover:text-primary-foreground", active && "bg-blue-800 text-primary-foreground dark:text-foreground font-semibold")}>{children}</Button>
        </Link>
    )
}