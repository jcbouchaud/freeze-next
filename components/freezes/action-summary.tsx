import { Action, Freeze } from "@/lib/definitions"

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";

type ActionSummaryType = {
    freeze: Freeze;
}
export const ActionSummary = ({ freeze }: ActionSummaryType) => {
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