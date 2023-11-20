import { BanIcon, CheckCheckIcon, CheckIcon, PauseIcon, Undo2Icon, XIcon } from "lucide-react"

import { Freeze } from "@/lib/definitions";
import Link from "next/link"

export const ActionsColumn = (freeze: Freeze) => {
    const { id, status, category, begin_date  } = freeze
    const today = new Date().toISOString().split("T")[0]
    const canCancel = category === "compensation" && new Date(begin_date) > new Date(today)

    switch (status) {
        case "ongoing":
            if (category != "bonus")
                return (
                    <Link href={{ pathname: `/freezes/interrupt/${id}` }} ><PauseIcon className="h-4 m-1" /></Link>
                );
            else
                return null
        case "interrupted":
        case "finished":
            if (category == "compensation")
                return (
                    <Link href={{ pathname: `/freezes/revert/${id}` }} ><Undo2Icon className="h-4 m-1" /></Link>
                );
            else
                return null
        case "pending":
            return (
                <div className="flex justify-start gap-2">
                    <Link href={{ pathname: `/freezes/approve/${id}` }} ><CheckIcon className="h-4 m-1" /></Link>
                    <Link href={{ pathname: `/freezes/force-approve/${id}` }} ><CheckCheckIcon className="h-4 m-1" /></Link>
                    <Link href={{ pathname: `/freezes/reject/${id}` }} ><BanIcon className="h-4 m-1" /></Link>
                    {canCancel && <Link href={{ pathname: `/freezes/cancel/${id}` }} ><XIcon className="h-4 m-1" /></Link>}
                </div>
            );

        default:
            return null;
    }
}
