import { Category, FreezeSearchParams, Status } from '@/lib/definitions';

import { CopyUrlButton } from '@/components/copy-url-button';
import SearchInput from '../../search/search-input';
import { SearchSelect } from '@/components/search/search-select';
import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Search() {
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
        <div className='flex flex-col' >
            <div className="flex flex-col sm:flex-row gap-1.5">
                <SearchInput<FreezeSearchParams> name="user" placeholder="Student id or login" />
                <div className="flex flex-row gap-1.5">
                    <SearchSelect<FreezeSearchParams> name="status" options={statusOptions} />
                    <SearchSelect<FreezeSearchParams> name="category" options={categoryOptions} />
                    <SearchSelect<FreezeSearchParams> name="campus" options={campusOptions} />
                    <CopyUrlButton />
                </div>
            </div>
        </div>

    )
}