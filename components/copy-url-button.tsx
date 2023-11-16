"use client"

import { Button } from "./ui/button";
import { Copy } from "lucide-react"
import { useSearchParams } from "next/navigation"

export const CopyUrlButton = () => {
    const searchParams = useSearchParams();

    const handleCopy = () => {
        const url = new URL(window.location.pathname, window.location.origin)
        const params = new URLSearchParams(searchParams);
        navigator.clipboard.writeText(`${url.toString()}?${params.toString()}`)
    }

    return (
        <Button
            variant="outline"
            className="flex flex-row items-center justify-center h-9 border rounded-sm"
            onClick={handleCopy}
        >
            <Copy className="h-4 w-4" />
        </Button>
    )
}
