import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const NavigationList = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <ul className={cn("flex flex-row justify-around sm:flex-col sm:gap-4 w-full", className)}>{children}</ul>
    )
}