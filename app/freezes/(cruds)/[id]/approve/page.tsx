import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { updateFreezeStatus } from "@/lib/action";

export default function Cancel({ params }: { params: { id: number } }) {
    const id = params.id
    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: 'Approve',
            href: `/freezes/${id}/approve`,
            active: true,
        },
    ]

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