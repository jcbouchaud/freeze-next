import { freezeActionSchema, freezeActionWithDescriptionSchema, freezeCreateSchema } from "./validators";

import { z } from "zod";

export type Action = "approve" | "force-approve" | "reject" | "cancel" | "revert" | "interrupt"

export type Status = "pending" | "ongoing" | "approved" | "interrupted" | "finished" | "reverted" | "cancelled" | "rejected";

export type Reason = "personal" | "medical" | "professional";

export type Category = "bonus" | "compensation" | "regular";

export type Source = "pace_system.milestones" | "freeze.freezes";

export type User = {
    id: number;
    login: string;
}

export type Freeze = {
    id: number;
    status: Status;
    user: User;
    reason: Reason;
    category: Category;
    begin_date: string;
    expected_end_date: string;
    effective_end_date?: string;
    student_description: string;
    staff_description?: string;
    approved_by?: string;
    approved_at?: Date,
    created_at: Date,
    updated_at?: Date
}

export type Event = {
    campus_city: string;
    campus_name: string;
    campus_id: number;
    event_id: number;
    login: string;
    result: string;
    source: Source;
    ts: Date;
    type: string;
    user_id: number;
}

export type BaseResponse<T> = {
    items: Array<T>;
    total: number;
    page: number;
    size: number;
    pages: number;
}

export type FreezesResponse = BaseResponse<Freeze>

export type EventsResponse = BaseResponse<Event>

export type BaseSearchParams = {
    page: string;
    size: string;
}

export type FreezeSearchParams = {
    user: string;
    status: Status;
    category: Category;
    campus: string;
} & BaseSearchParams

export type EventsSearchParams = {
    user: string;
    sources: Source;
    campus: number;
    result: string;
} & BaseSearchParams

export type FreezeCreateFormValues = z.infer<typeof freezeCreateSchema>

export type FreezeActionFormValues = z.infer<typeof freezeActionSchema>

export type FreezeActionWithDescriptionFormValues = z.infer<typeof freezeActionWithDescriptionSchema>
