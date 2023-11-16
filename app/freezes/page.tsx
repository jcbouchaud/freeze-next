import { FreezeSearchParams, FreezesResponse } from "../../lib/definitions";

import { CreateFreezeButton } from "@/components/freezes/create-form";
import { DataTable } from "@/components/data-table";
import Search from "@/components/freezes/table/search";
import { authConfig } from "../../lib/auth";
import { columns } from "@/components/freezes/table/columns";
import { getServerSession } from "next-auth";

async function fetchFreezes(params: FreezeSearchParams): Promise<FreezesResponse> {
  const session = await getServerSession(authConfig)
  const url = new URL("/api/v2/freezes", "https://freeze-staging.42.fr")
  const headers = new Headers()
  headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

  Object.entries(params).map(p => {
    if (Array.isArray(p[1])) {
      p[1].map(x => url.searchParams.append(p[0], x))
    } else {
      url.searchParams.set(p[0], p[1] as string)
    }
  })

  return await fetch(url.toString(), { headers }).then((res) => res.json());
}


export default async function FreezesPage({ searchParams }: { searchParams: FreezeSearchParams }) {
  const { items, total, page, size, pages }: FreezesResponse = await fetchFreezes(searchParams)

  return (
    <main>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Freezes</h3>
          <p className="text-sm text-muted-foreground">
            Manage students freezes from your campuses
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <Search />
          <CreateFreezeButton />
        </div>
        <DataTable data={items} columns={columns} />
      </div>
    </main>
  )
}


