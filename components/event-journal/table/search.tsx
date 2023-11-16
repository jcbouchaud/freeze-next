import { EventsSearchParams, Source } from '@/lib/definitions';

import { CopyUrlButton } from '@/components/copy-url-button';
import SearchInput from '../../search/search-input';
import { SearchSelect } from '@/components/search/search-select';
import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Search() {
    const session = await getServerSession(authConfig);

    if (!session) return null

    const sourceOptions: Array<{ label: string, value: Source }> = [
        { label: "Freeze", value: "freeze.freezes" },
        { label: "Pace System", value: "pace_system.milestones" },
    ]

    const campusOptions: Array<{ label: string, value: string }> = session?.campuses
        .filter(x => x !== "*")
        .map(x => {
            return { label: x, value: x }
        })

    return (
        <div className='flex flex-col' >
            <div className="flex flex-col sm:flex-row gap-1.5">
                <SearchInput<EventsSearchParams> name="user" placeholder="Student id or login" />
                <div className="flex flex-row gap-1.5">
                    <SearchSelect<EventsSearchParams> name="sources" options={sourceOptions} />
                    <SearchSelect<EventsSearchParams> name="campus" options={campusOptions} />
                    <SearchInput<EventsSearchParams> name="result" placeholder="Filter by results keywords" />
                </div>
                <CopyUrlButton />
            </div>
        </div>

    )
}