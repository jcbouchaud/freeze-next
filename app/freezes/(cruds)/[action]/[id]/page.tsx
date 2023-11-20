import Breadcrumbs from "@/components/breadcrumbs";
import { Action, Freeze } from "@/lib/definitions";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/freezes/action-form";
import { ActionFormWithDescription } from "@/components/freezes/action-form-with-description";
import { ActionSummary } from "@/components/freezes/action-summary";

async function fetchFreeze(id: number): Promise<Freeze> {
    const session = await getServerSession(authConfig)
    const url = new URL(`/api/v2/freezes/${id}`, "https://freeze-staging.42.fr")

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${session?.accessToken as string}`)

    const res = await fetch(url, { headers })

    if (!res.ok) {
        const error = await res.json()
        throw Error(error.detail)
    }

    return await res.json()
}

export default async function Action({ params }: { params: { id: number, action: Action } }) {
    const { id, action } = params
    const freeze = await fetchFreeze(id)

    const authorized = () => {
        if (action === "interrupt" && freeze.status === "ongoing" && freeze.category !== "bonus") return true
        if (action === "revert" && ["interrupted", "finished"].includes(freeze.status) && freeze.category === "compensation") return true
        if (["approve", "force-approve", "reject"].includes(action) && freeze.status === "pending") return true

        const today = new Date().toISOString().split("T")[0]
        if (action === "cancel" && freeze.category === "compensation" && new Date(freeze.begin_date) > new Date(today)) return true

        return false
    }

    if (!authorized()) return notFound()

    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: action,
            href: `/freezes/${id}/${action}`,
            active: true,
        },
    ]

    return (
        <main className="h-full flex flex-col">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="w-full rounded-md bg-muted p-4 md:p-6 max-w-3xl">
                {["approve", "force-approve", "reject", "cancel"].includes(action) &&
                    <ActionFormWithDescription id={id} action={action}>
                        <ActionSummary freeze={freeze} action={action} />
                    </ActionFormWithDescription>
                }
                {["interrupt", "revert"].includes(action) &&
                    <ActionForm id={id} action={action}>
                        <ActionSummary freeze={freeze} action={action} />
                    </ActionForm>
                }
            </div>
        </main>
    )
}
