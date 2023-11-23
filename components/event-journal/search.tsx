import { EventsSearchParams, Source } from '@/lib/definitions';

import { Search } from '../search';
import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function EventJournalSearch() {
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
        <Search>
            <Search.Group>
                <Search.Input<EventsSearchParams> name="user" placeholder="Student id or login" />
            </Search.Group>
            <Search.Group>
                <Search.Input<EventsSearchParams> name="result" placeholder="Filter by results keywords" />
            </Search.Group>
            <Search.Group>
                <Search.Calendar<EventsSearchParams> name="from_date" placeholder="From" />
                <Search.Calendar<EventsSearchParams> name="to_date" placeholder="To" />
            </Search.Group>
            <Search.Group>
                <Search.Select<EventsSearchParams> name="sources" options={sourceOptions} />
                <Search.Select<EventsSearchParams> name="campus" options={campusOptions} />
            </Search.Group>
            <Search.Group>
                <Search.Copy />
                <Search.Reset />
            </Search.Group>
        </Search>
    )
}