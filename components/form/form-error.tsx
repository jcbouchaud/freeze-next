import { cn } from "@/app/lib/utils"

export const FormError = ({ message }: { message?: string }) => {
    return (
        <div className={cn("mb-4 px-2 text-xs h-6 flex items-center", message && "text-red-500 border border-red-500 bg-red-200 rounded-sm")}>{message}</div>
    )
}