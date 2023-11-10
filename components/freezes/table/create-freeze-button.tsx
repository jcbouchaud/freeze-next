import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export const CreateFreezeButton = () => {
    return (
        <Link href="/freezes/create">
            <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Create a Freeze</span>
            </Button>
        </Link>
    )
}