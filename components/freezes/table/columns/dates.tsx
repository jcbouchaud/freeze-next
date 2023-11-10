import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { ChevronsRight } from "lucide-react";
import { Freeze } from "@/lib/definitions";
import { cn } from "@/lib/utils";

type DatesColumnProps = Pick<Freeze, "begin_date" | "expected_end_date" | "effective_end_date">

export const DatesColumn = ({ begin_date, expected_end_date, effective_end_date }: DatesColumnProps) => {
    const endDate = effective_end_date ?? expected_end_date

    return (
        <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
                <div className="flex flex-col align-middle w-fit">
                    <div className="flex flex-row gap-1 items-center whitespace-nowrap">
                        {begin_date}
                        <ChevronsRight size={16} strokeWidth={1.5} />
                        <span className={cn(effective_end_date && "text-orange-400 font-semibold")}>
                            {endDate}
                        </span>
                    </div>
                    {/* <div>{formatDurationFromInterval(new Date(beginDate), new Date(endDate))}</div> */}
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="break-words w-full max-w-md">
                <div className="flex flex-col">
                    <div>Begin date: {begin_date}</div>
                    <div>End date: {expected_end_date}</div>
                    { effective_end_date && <div>Effective end date: {effective_end_date}</div> }
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}