import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const ActionSummarySkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse pb-16">
            <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="h-3" htmlFor="login"></Label>
                    <Input id="login" disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="h-3" htmlFor="user-id"></Label>
                    <Input id="user-id" disabled />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="h-3" htmlFor="begin-date"></Label>
                    <Input id="begin-date" disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="h-3" htmlFor="end-date"></Label>
                    <Input id="end-date" disabled />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="h-3" htmlFor="category"></Label>
                    <Input id="category" disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="h-3" htmlFor="reason"></Label>
                    <Input id="reason" disabled />
                </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label className="h-3" htmlFor="student-description"></Label>
                <Textarea id="student-description" disabled />
            </div>
        </div>
    )
}