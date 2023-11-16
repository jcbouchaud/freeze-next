import { DataTable, Pagination } from "@/components/data-table";
import { FreezeSearchParams, FreezesResponse } from "@/lib/definitions";

import { CreateFreezeButton } from "@/components/freezes/create-form";
import Search from "@/components/freezes/table/search";
import { authConfig } from "@/lib/auth";
import { buildUrlFromBrowserParams } from "@/lib/utils";
import { columns } from "@/components/freezes/table/columns";
import { getServerSession } from "next-auth";

async function fetchFreezes(params: FreezeSearchParams): Promise<FreezesResponse> {
  const session = await getServerSession(authConfig)
  const url = new URL("/api/v2/freezes", "https://freeze-staging.42.fr")
  const freezesURL = buildUrlFromBrowserParams<FreezeSearchParams>(url, params)
  
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

  return await fetch(freezesURL, { headers }).then((res) => res.json());
}


export default async function FreezesPage({ searchParams }: { searchParams: FreezeSearchParams }) {
  const { items, size, pages }: FreezesResponse = await fetchFreezes(searchParams)

  return (
    <main>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Freezes</h3>
          <p className="text-sm text-muted-foreground">
            Manage students freezes from your campuses
          </p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-2">
          <Search />
          <CreateFreezeButton />
        </div>
        <DataTable data={items} columns={columns} />
        <Pagination pages={pages} size={size} />
      </div>
    </main>
  )
}


