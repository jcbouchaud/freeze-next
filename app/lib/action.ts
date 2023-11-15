'use server';

import { FreezeFormValues } from '@/components/freezes/create-form';
import { authConfig } from './auth';
import { convertDateToShortString } from './utils';
import { format } from 'date-fns';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from "zod"

const ReasonSchema = z.union([
    z.literal("personal"),
    z.literal("medical"),
    z.literal("professional")
])

const CategorySchema = z.union([
    z.literal("bonus"),
    z.literal("compensation"),
    z.literal("regular")
])

const dateRangeSchema = z.object({
    from: z.union([z.date(), z.undefined()]),
    to: z.date().optional()
})

const FreezeCreateSchema = z.object({
    userId: z.string(),
    reason: ReasonSchema,
    category: CategorySchema,
    dateRange: dateRangeSchema,
    staffDescription: z.string().optional()
})

type State = {
    errors?: {
        userId?: string[];
        reason?: string[];
        category?: string[];
        dateRange?: string[];
        staffDescription?: string[];
    };
    message?: string | null;
};

export async function createFreeze(formValues: FreezeFormValues) {
    const session = await getServerSession(authConfig)

    const url = new URL("/api/v2/freezes?force=true", "https://freeze-staging.42.fr");

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken}`)

    const body = JSON.stringify({
        user_id: formValues.userId,
        reason: formValues.reason,
        category: formValues.category,
        begin_date: convertDateToShortString(formValues.datesRange.from),
        expected_end_date: convertDateToShortString(formValues.datesRange.to),
        staff_description: formValues.staffDescription,
    })

    try {
        const res = await fetch(url, {
            headers,
            method: "POST",
            body
        })

        if (!res.ok) {
            const error = await res.json()
            console.log(error)
            throw Error(error.detail)
        }

    } catch (e) {
        console.log(e)
        return {
            message: 'API Error: Failed to Create Freeze.',
        };
    }

    revalidatePath('/freezes');
    redirect('/freezes');
}
