import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { updateFreezeStatus } from "@/app/lib/action";

export default function Cancel({ params }: { params: { id: number } }) {
    const id = params.id
    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: 'Cancel',
            href: `/freezes/${id}/cancel`,
            active: true,
        },
    ]

    const updateFreezeStatusWithId = updateFreezeStatus.bind(null, id, "cancel")

    return (
        <main className="h-full flex flex-col">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="w-full">
                Cancel freeze with {id}
                <form action={updateFreezeStatusWithId}>
                    <Button type="submit">Cancel</Button>
                </form>
            </div>
        </main>
    )
}