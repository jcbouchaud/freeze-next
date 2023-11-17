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
                    <Link href={{ pathname: `/freezes/${id}/interrupt`, query: { login: freeze.user.login, begin_date: freeze.begin_date, expected_end_date: freeze.expected_end_date, effective_end_date: freeze.effective_end_date, reason: freeze.reason, category: freeze.category, status: freeze.status } }} ><PauseIcon className="h-4 m-1" /></Link>
                );
            else
                return null
        case "interrupted":
        case "finished":
            if (category == "compensation")
                return (
                    <Link href={{ pathname: `/freezes/${id}/revert`, query: { login: freeze.user.login, begin_date: freeze.begin_date, expected_end_date: freeze.expected_end_date, effective_end_date: freeze.effective_end_date, reason: freeze.reason, category: freeze.category, status: freeze.status } }} ><Undo2Icon className="h-4 m-1" /></Link>
                );
            else
                return null
        case "pending":
            return (
                <div className="flex justify-start gap-2">
                    <Link href={{ pathname: `/freezes/${id}/approve`, query: { login: freeze.user.login, begin_date: freeze.begin_date, expected_end_date: freeze.expected_end_date, effective_end_date: freeze.effective_end_date, student_description: freeze.student_description, reason: freeze.reason, category: freeze.category, status: freeze.status } }} ><CheckIcon className="h-4 m-1" /></Link>
                    <Link href={{ pathname: `/freezes/${id}/force-approve`, query: { login: freeze.user.login, begin_date: freeze.begin_date, expected_end_date: freeze.expected_end_date, effective_end_date: freeze.effective_end_date, student_description: freeze.student_description, reason: freeze.reason, category: freeze.category, status: freeze.status } }} ><CheckCheckIcon className="h-4 m-1" /></Link>
                    <Link href={{ pathname: `/freezes/${id}/reject`, query: { login: freeze.user.login, begin_date: freeze.begin_date, expected_end_date: freeze.expected_end_date, effective_end_date: freeze.effective_end_date, student_description: freeze.student_description, reason: freeze.reason, category: freeze.category, status: freeze.status } }} ><BanIcon className="h-4 m-1" /></Link>
                    {canCancel && <Link href={{ pathname: `/freezes/${id}/cancel`, query: { login: freeze.user.login, begin_date: freeze.begin_date, expected_end_date: freeze.expected_end_date, effective_end_date: freeze.effective_end_date, student_description: freeze.student_description, reason: freeze.reason, category: freeze.category, status: freeze.status } }} ><XIcon className="h-4 m-1" /></Link>}
                </div>
            );

        default:
            return null;
    }
}
