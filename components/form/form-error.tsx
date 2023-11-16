import { cn } from "@/lib/utils"

export const FormError = ({ message }: { message?: string }) => {
    return (
        <div className={cn("mb-4 px-2 text-xs h-6 flex items-center", message && "text-destructive border border-destructive bg-red-300 dark:bg-destructive dark:text-foreground rounded-sm")}>{message}</div>
    )
}