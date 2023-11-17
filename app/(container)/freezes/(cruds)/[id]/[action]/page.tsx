import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Freeze } from "@/lib/definitions";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { updateFreezeStatus } from "@/lib/action";

async function fetchFreeze(id: number): Promise<Freeze> {
    const session = await getServerSession(authConfig)
    const url = new URL(`/api/v2/freezes/${id}`, "https://freeze-staging.42.fr")

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

    return await fetch(url, { headers }).then((res) => res.json());
}

export default async function Action({ params }: { params: { id: number, action: string } }) {
    const { id, action } = params
    const freeze = await fetchFreeze(id)

    
    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: 'Approve',
            href: `/freezes/${id}/${action}`,
            active: true,
        },
    ]

    console.log(freeze)

    const updateFreezeStatusWithId = updateFreezeStatus.bind(null, id, "approve")

    return (
        <main className="h-full flex flex-col">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="w-full">
                Approve freeze with {id}
                <form action={updateFreezeStatusWithId}>
                    <Button type="submit">Approve</Button>
                </form>
            </div>
        </main>
    )
}
