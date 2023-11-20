'use server';

import { FreezeActionFormValues, FreezeCreateFormValues } from './definitions';

import { authConfig } from './auth';
import { convertDateToShortString } from './utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createFreeze(data: FreezeCreateFormValues) {
    const { userId, reason, category, datesRange, staffDescription } = data;
    const session = await getServerSession(authConfig);

    const url = new URL("/api/v2/freezes?force=true", "https://freeze-staging.42.fr");

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken}`)

    const body = JSON.stringify({
        user_id: userId,
        reason: reason,
        category: category,
        begin_date: convertDateToShortString(datesRange.from),
        expected_end_date: convertDateToShortString(datesRange.to),
        staff_description: staffDescription,
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


export async function updateFreezeStatus(params: string, data: FreezeActionFormValues) {
    const { id, action, staffDescription } = data;
    const session = await getServerSession(authConfig)

    const url = new URL(`/api/v2/freezes/${id}/${action}`, "https://freeze-staging.42.fr");

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken}`)
    
    const body = staffDescription ? JSON.stringify({ staff_description: staffDescription }) : null;
    

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