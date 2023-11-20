import { Action, Freeze } from "@/lib/definitions"

type ActionSummaryType = {
    freeze: Freeze;
    action: Action;
}
export const ActionSummary = ({ freeze, action }: ActionSummaryType) => {
    return (
        <>
            <div>
                You are willing to <span className="capitalize">{action}</span> the following freeze :
            </div>
            <div className="space-y-2">
                <div>Login: {freeze.user.login}</div>
                <div>User ID: {freeze.user.id}</div>
                <div>Begin date: {freeze.begin_date}</div>
                {<div>End Date: {freeze.effective_end_date ?? freeze.expected_end_date}</div>}
                <div>Reason: {freeze.reason}</div>
            </div>
        </>
    )
}