"use client"

import { Category, FreezeSearchParams, Status } from '@/lib/definitions';

import { Search } from '../search';
import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { useQuerySearchHandlers } from '@/hooks/use-query-search-handlers';
import { useSession } from 'next-auth/react';

export default function FreezeSearch() {
    // const session = await getServerSession(authConfig);
    const { data } = useSession()
    const { handleInputSearch, handleSelectSearch } = useQuerySearchHandlers<FreezeSearchParams>()

    if (!data) return null

    const categoryOptions: Array<{ label: string, value: Category }> = [
        { label: "regular", value: "regular" },
        { label: "compensation", value: "compensation" },
        { label: "bonus", value: "bonus" }
    ]

    const statusOptions: Array<{ label: string, value: Status }> = [
        { label: "approved", value: "approved" },
        { label: "pending", value: "pending" },
        { label: "ongoing", value: "ongoing" },
        { label: "interrupted", value: "interrupted" },
        { label: "cancelled", value: "cancelled" },
        { label: "rejected", value: "rejected" },
        { label: "reverted", value: "reverted" },
        { label: "finished", value: "finished" },
    ]

    const campusOptions: Array<{ label: string, value: string }> = data?.campuses
        .filter(x => x !== "*")
        .map(x => {
            return { label: x, value: x }
        })

    return (
        <Search>
            <Search.Group>
                <Search.Input placeholder="Student id or login" onChange={(e) => handleInputSearch("user", e.target.value)} />
            </Search.Group>
            <Search.Group>
                {/* <Search.Select name="status" options={statusOptions} onChange={(e) => handleSelectSearch("status", e.target.value)} /> */}
                {/* <Search.Select name="category" options={categoryOptions} />
                <Search.Select name="campus" options={campusOptions} /> */}
            </Search.Group>
            <Search.Group>
                <Search.Copy />
                <Search.Reset />
            </Search.Group>
        </Search>
    )
}