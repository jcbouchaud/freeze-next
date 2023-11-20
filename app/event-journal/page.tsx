import { EventsResponse, EventsSearchParams } from "@/lib/definitions";

import { DataTable, } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import Search from "@/components/event-journal/search";
import { authConfig } from "@/lib/auth";
import { buildUrlFromBrowserParams } from "@/lib/utils";
import { columns } from "@/components/event-journal/columns";
import { getServerSession } from "next-auth";

export const metadata = {
  title: 'Staff - Event journal',
}

async function fetchEvents(params: EventsSearchParams): Promise<EventsResponse> {
  const session = await getServerSession(authConfig)
  const url = new URL("/events/", "https://event-journal-staging.42.fr")
  const eventsURL = buildUrlFromBrowserParams<EventsSearchParams>(url, params)

  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

  return await fetch(eventsURL, { headers, cache: "no-cache" }).then((res) => res.json());
}

export default async function EventJournal({ searchParams }: { searchParams: EventsSearchParams }) {
  const { items, size, pages }: EventsResponse = await fetchEvents(searchParams)

  return (
    <main className="space-y-6">
      <div className="flex flex-row justify-between">
        <Search />
      </div>
      <DataTable data={items} columns={columns} />
      <Pagination pages={pages} size={size} />
    </main>
  )
}


