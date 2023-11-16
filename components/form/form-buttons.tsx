"use client"

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export const FormButtons = () => {
    const router = useRouter()
    
    return (
        <div className="flex flex-row justify-end">
            <Button size="sm" type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
            <Button size="sm" type="submit">Create</Button>
        </div>
    )
}
