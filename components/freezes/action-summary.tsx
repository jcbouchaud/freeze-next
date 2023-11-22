import { Action, Freeze } from "@/lib/definitions"

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

type ActionSummaryType = {
    id: number;
    action: Action;
}

async function fetchFreeze(id: number): Promise<Freeze> {
    const session = await getServerSession(authConfig)
    const url = new URL(`/api/v2/freezes/${id}`, "https://freeze-staging.42.fr")

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

    const res = await fetch(url, { headers })

    if (!res.ok) {
        const error = await res.json()
        throw Error(error.detail)
    }

    return await res.json()
}

export const ActionSummary = async ({ id, action }: ActionSummaryType) => {
    const freeze = await fetchFreeze(id)

    const isActionAuthorized = () => {
        const { status, category, begin_date } = freeze;
        const today = new Date().toISOString().split("T")[0];

        switch (action) {
            case "interrupt":
                return status === "ongoing" && category !== "bonus";
            case "revert":
                return ["interrupted", "finished"].includes(status) && category === "compensation";
            case "cancel":
                return category === "compensation" && new Date(begin_date) > new Date(today);
            case "approve":
            case "force-approve":
            case "reject":
                return status === "pending";
            default:
                return false;
        }
    };

    if (!isActionAuthorized()) throw Error(`You cannot ${action} freeze ${id} as its status is ${freeze.status}.`)
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="login">Login</Label>
                    <Input id="login" disabled defaultValue={freeze.user.login} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="user-id">User ID</Label>
                    <Input id="user-id" disabled defaultValue={freeze.user.id} />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="begin-date">Begin date</Label>
                    <Input id="begin-date" disabled defaultValue={freeze.begin_date} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="end-date">End date</Label>
                    <Input id="end-date" disabled defaultValue={freeze.effective_end_date ?? freeze.expected_end_date} />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" disabled defaultValue={freeze.category} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="reason">Reason</Label>
                    <Input id="reason" disabled defaultValue={freeze.reason} />
                </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="student-description">Student description</Label>
                <Textarea id="student-description" disabled value={freeze.student_description || "No description"} />
            </div>
        </div>
    )
}