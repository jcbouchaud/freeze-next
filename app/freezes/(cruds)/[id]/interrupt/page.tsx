import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { updateFreezeStatus } from "@/app/lib/action";

export default function Interrupt({ params }: { params: { id: number } }) {
    const id = params.id
    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: 'Interrupt',
            href: `/freezes/${id}/interrupt`,
            active: true,
        },
    ]

    const updateFreezeStatusWithId = updateFreezeStatus.bind(null, id, "interrupt")

    return (
        <main className="h-full flex flex-col">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="w-full">
                Interrupt freeze with {id}
                <form action={updateFreezeStatusWithId}>
                    <Button type="submit">Interrupt</Button>
                </form>
            </div>
        </main>
    )
}