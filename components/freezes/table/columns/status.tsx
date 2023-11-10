import { Freeze, Status } from "@/lib/definitions"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { VariantProps, cva } from "class-variance-authority"

type StatusColumnProps = Pick<Freeze, "status" | "approved_at" | "approved_by">;

const statusVariants = cva(
    "py-1 rounded w-20 text-xs text-center font-semibold capitalize cursor-pointer",
    {
        variants: {
            variant: {
                cancelled: "dark:bg-gray-100 bg-gray-100 text-black/90",
                interrupted: "dark:bg-yellow-500 bg-yellow-500 text-white/90",
                rejected: "dark:bg-red-500 bg-red-400 text-white/90",
                approved: "dark:bg-emerald-600 bg-emerald-500 text-white/90",
                pending: "dark:bg-orange-500 bg-orange-400 text-white/90",
                ongoing: "dark:bg-blue-600 bg-blue-700 text-white/90",
                finished: "dark:bg-black/50 bg-black/50 text-white/90",
                reverted: "dark:bg-gray-100 bg-gray-100 text-black/90",

            },
        },
        defaultVariants: {
            variant: "cancelled",
        },
    }
)

export interface StatusProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
}

const StatusField = ({ variant }: VariantProps<typeof statusVariants>) => {
    return (
        <div className={statusVariants({ variant })}>
            {variant?.toString().toLowerCase()}
        </div>
    )
}

export const StatusColumn = ({ status, approved_by, approved_at }: StatusColumnProps) => {
    if (!approved_by) {
        return <StatusField variant={status as Status} />
    }
    
    return (
        <HoverCard>
            <HoverCardTrigger>
                <StatusField variant={status as Status} />
            </HoverCardTrigger>
            <HoverCardContent className="break-words w-full max-w-md">
                <div className="flex flex-col items-start">
                    <div>Approved at: {approved_at?.toString()}</div>
                    <div>Approved by: {approved_by}</div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
