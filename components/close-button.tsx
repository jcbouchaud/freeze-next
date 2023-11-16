"use client"

import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function CloseButton() {
    const router = useRouter()

    return (
        <Button className='cursor-pointer' onClick={() => router.back()}>Close</Button>
    )
}