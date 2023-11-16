import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { updateFreezeStatus } from "@/app/lib/action";

export default function Revert({ params }: { params: { id: number } }) {
    const id = params.id
    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: 'Revert',
            href: `/freezes/${id}/revert`,
            active: true,
        },
    ]

    const updateFreezeStatusWithId = updateFreezeStatus.bind(null, id, "revert")

    return (
        <main className="h-full flex flex-col">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="w-full">
                Revert freeze with {id}
                <form action={updateFreezeStatusWithId}>
                    <Button type="submit">Revert</Button>
                </form>
            </div>
        </main>
    )
}