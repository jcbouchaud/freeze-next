import { Category, FreezeSearchParams, Reason, Status } from '@/app/lib/definitions';

import SearchInput from '../../search/search-input';
import { SearchSelect } from '@/components/search/search-select';

export default function Search() {
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

    return (
        <div className='flex flex-col' >
            <div className="flex flex-row gap-1.5">
                <SearchInput<FreezeSearchParams> name="user" placeholder="User id or login" />
                <SearchSelect<FreezeSearchParams> name="status" options={statusOptions} />
                <SearchSelect<FreezeSearchParams> name="category" options={categoryOptions} />
            </div>
        </div>

    )
}