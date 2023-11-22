"use client"

import { usePathname, useRouter } from "next/navigation"

import { Button } from "../ui/button";
import { Trash } from "lucide-react"

export const SearchReset = () => {
    const { replace } = useRouter();
    const pathname = usePathname();
 
    const handleReset = () => {
        replace(pathname)
    }

    return (
        <Button
            variant="outline"
            className="flex flex-row items-center justify-center h-9 border rounded-sm"
            onClick={handleReset}
        >
            <Trash className="h-4 w-4" />
        </Button>
    )
}
