// "use client"

import { Button } from "../../button"
import React from "react"
import { cn } from "@/lib/utils"

type NavigationItemProps = {
    active?: boolean;
} & React.ComponentPropsWithoutRef<typeof Button>

export const NavigationItem = React.forwardRef<
    React.ElementRef<typeof Button>,
    NavigationItemProps
>(({ className, children, active, asChild, variant, ...props }, ref) => {
    return (
        <li className="list-none">
            <Button asChild={asChild} variant={variant} className={cn("w-full px-2 h-8 flex flex-row items-center justify-center lg:justify-start rounded-md bg-transparent text-muted-foreground lg:w-full hover:text-primary-foreground", active && "text-blue-700 sm:bg-blue-800 sm:text-primary-foreground sm:dark:text-foreground font-semibold", className)} {...props} ref={ref}>
                {children}
            </Button>
        </li>
    )
})

NavigationItem.displayName = "NavigationItem"

