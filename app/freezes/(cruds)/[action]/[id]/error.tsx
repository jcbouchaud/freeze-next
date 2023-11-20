'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    return (
        <div className="space-y-6 p-4">
            <h1 className="font-semibold text-xl">Something went wrong !</h1>
            <h2>{error.message}</h2>
            <Button variant="destructive" onClick={() => router.back()}>Navigate back</Button>
        </div>
    )
}