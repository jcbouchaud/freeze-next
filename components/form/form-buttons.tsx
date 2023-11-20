"use client"

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
type FormButtonsProps = {
    cancelText?: string;
    validateText?: string;
}

export const FormButtons = ({ cancelText, validateText }: FormButtonsProps) => {
    const router = useRouter()
    
    return (
        <div className="flex flex-row justify-end gap-4">
            <Button size="sm" type="button" className="capitalize" variant="destructive" onClick={() => router.back()}>{cancelText ?? "Cancel"}</Button>
            <Button size="sm" className="capitalize" type="submit">{validateText ?? "Create"}</Button>
        </div>
    )
}
