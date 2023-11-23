import { Category, FreezeSearchParams, Status } from '@/lib/definitions';

import { Search } from '../search';
import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function FreezeSearch() {
    const session = await getServerSession(authConfig);

    if (!session) return null

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

    const campusOptions: Array<{ label: string, value: string }> = session?.campuses
        .filter(x => x !== "*")
        .map(x => {
            return { label: x, value: x }
        })

    return (
        <Search>
            <Search.Group>
                <Search.Input<FreezeSearchParams> name="user" placeholder="Student id or login" />
            </Search.Group>
            <Search.Group>
                <Search.Select<FreezeSearchParams> name="status" options={statusOptions} />
                <Search.Select<FreezeSearchParams> name="category" options={categoryOptions} />
                <Search.Select<FreezeSearchParams> name="campus" options={campusOptions} />
            </Search.Group>
            <Search.Group>
                <Search.Copy />
                <Search.Reset />
            </Search.Group>
        </Search>
    )
}