import { freezeCreateSchema } from "./validators";
import { z } from "zod";

export type Status = "pending" | "ongoing" | "approved" | "interrupted" | "finished" | "reverted" | "cancelled" | "rejected";

export type Reason = "personal" | "medical" | "professional";

export type Category = "bonus" | "compensation" | "regular";

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

export type FreezesResponse = {
    items: Array<Freeze>;
    total: number;
    page: number;
    size: number;
    pages: number;
}

export type FreezeSearchParams = {
    page: number;
    size: number;
    user: string;
    status: Status;
    category: Category;
    campus: number;
}

export type FreezeCreateFormValues = z.infer<typeof freezeCreateSchema>
