import { FreezeSearchParams, FreezesResponse } from "../lib/definitions";

import { DataTable } from "@/components/data-table";
import Search from "@/components/search";
import { authConfig } from "../lib/auth";
import { columns } from "@/components/freezes-table/columns";
import { getServerSession } from "next-auth";

async function getFreezes(params: FreezeSearchParams): Promise<FreezesResponse> {
  const session = await getServerSession(authConfig)
  const headers = new Headers()
  headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

  const url = new URL("https://freeze-staging.42.fr/api/v2/freezes")

  if (params.hasOwnProperty("user")) {
    url.searchParams.append("user", params["user"])
  }
  
  return await fetch(url.toString(), { headers }).then((res) => res.json());
}


export default async function FreezesPage({ searchParams }: { searchParams: FreezeSearchParams }) {
  const { items, total, page, size, pages }: FreezesResponse = await getFreezes(searchParams)

  return (
    <main className="flex min-h-screen flex-col justify-start px-24 pb-24 space-y-2">
      <h1 className="text-2xl font-bold mb-4">Welcome to Freeze</h1>
      <Search />
      <DataTable data={items} columns={columns} />
    </main>
  )
}


