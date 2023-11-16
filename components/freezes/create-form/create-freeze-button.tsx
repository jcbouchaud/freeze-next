import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export const CreateFreezeButton = () => {
    return (
        <Link href="/freezes/create">
            <Button variant="outline">
                <PlusCircle className="h-4 w-4" />
                <span className="ml-2">Create a Freeze</span>
            </Button>
        </Link>
    )
}