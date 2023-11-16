'use server';

import { FreezeCreateFormValues } from './definitions';
import { authConfig } from './auth';
import { convertDateToShortString } from './utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createFreeze(data: FreezeCreateFormValues) {
    const session = await getServerSession(authConfig)

    const url = new URL("/api/v2/freezes?force=true", "https://freeze-staging.42.fr");

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken}`)

    const body = JSON.stringify({
        user_id: data.userId,
        reason: data.reason,
        category: data.category,
        begin_date: convertDateToShortString(data.datesRange.from),
        expected_end_date: convertDateToShortString(data.datesRange.to),
        staff_description: data.staffDescription,
    })

    const res = await fetch(url, {
        headers,
        method: "POST",
        body
    })

    if (!res.ok) {
        const error = await res.json()
        throw Error(error.detail)
    }

    revalidatePath('/freezes');
    redirect('/freezes');
}


export async function updateFreezeStatus(id: number, action: string, formData: FormData) {
    const session = await getServerSession(authConfig)

    const url = new URL(`/api/v2/freezes/${id}/${action}`, "https://freeze-staging.42.fr");

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken}`)

    const res = await fetch(url, {
        headers,
        method: "POST",
    })

    if (!res.ok) {
        const error = await res.json()
        console.log(error)
        throw Error(error.detail)
    }

    revalidatePath('/freezes');
    redirect('/freezes');
}