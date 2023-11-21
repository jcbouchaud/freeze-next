'use client'

import { redirect, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    return (
        <div className="space-y-6 py-4">
            <h1 className="font-semibold text-xl">Something went wrong !</h1>
            <h2>{error.message}</h2>
            <Button variant="destructive" onClick={() => router.replace("/freezes")}>Back to Freeze</Button>
        </div>
    )
}