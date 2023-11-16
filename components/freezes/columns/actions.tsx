import { BanIcon, CheckCheckIcon, CheckIcon, PauseIcon, Undo2Icon, XIcon } from "lucide-react"
import { Category, Status } from "@/lib/definitions";

import Link from "next/link"

type ActionsColumnProps = {
    id: number;
    status: Status;
    category: Category;
    beginDate: string;
}

export const ActionsColumn = ({ id, status, category, beginDate }: ActionsColumnProps) => {
    const today = new Date().toISOString().split("T")[0]
    const canCancel = category === "compensation" && new Date(beginDate) > new Date(today)

    switch (status) {
        case "ongoing":
            if (category != "bonus")
                return (
                    <Link href={`/${id}/interrupt`}><PauseIcon className="h-4 m-1" /></Link>
                );
            else
                return null
        case "interrupted":
        case "finished":
            if (category == "compensation")
                return (
                    <Link href={`/${id}/revert`}><Undo2Icon className="h-4 m-1" /></Link>
                );
            else
                return null
        case "pending":
            return (
                <div className="flex justify-start gap-2">
                    <Link href={`/${id}/approve`}><CheckIcon className="h-4 m-1" /></Link>
                    <Link href={`/${id}/force-approve`}><CheckCheckIcon className="h-4 m-1" /></Link>
                    <Link href={`/${id}/reject`}><BanIcon className="h-4 m-1" /></Link>
                    {canCancel && <Link href={`/${id}/cancel`}><XIcon className="h-4 m-1" /></Link>}
                </div>
            );

        default:
            return null;
    }
}
