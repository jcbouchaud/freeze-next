import { FreezeSearchParams, FreezesResponse } from "@/lib/definitions";

import { CreateFreezeButton } from "@/components/freezes/create-freeze-button";
import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import Search from "@/components/freezes/search";
import { authConfig } from "@/lib/auth";
import { buildUrlFromBrowserParams } from "@/lib/utils";
import { columns } from "@/components/freezes/columns";
import { getServerSession } from "next-auth";

export const metadata = {
  title: 'Staff - Freeze',
}

async function fetchFreezes(params: FreezeSearchParams): Promise<FreezesResponse> {
  const session = await getServerSession(authConfig)
  const url = new URL("/api/v2/freezes", "https://freeze-staging.42.fr")
  const freezesURL = buildUrlFromBrowserParams<FreezeSearchParams>(url, params)

  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

  return await fetch(freezesURL, { headers, cache: "no-store" }).then((res) => res.json());
}

export default async function FreezesPage({ searchParams }: { searchParams: FreezeSearchParams }) {
  const { items, size, pages }: FreezesResponse = await fetchFreezes(searchParams)

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-2">
        <Search />
        <CreateFreezeButton />
      </div>
      <DataTable data={items} columns={columns} />
      <Pagination pages={pages} size={size} />
    </main>
  )
}


