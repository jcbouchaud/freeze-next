import Breadcrumbs from "@/components/breadcrumbs";

export default function Approve({ params }: { params: { id: string } }) {
    const id = params.id
    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: 'Approve',
            href: `/freezes/${id}/approve`,
            active: true,
        },
    ]

    return (
        <main className="h-full flex flex-col">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="w-full">
                Approve freeze with {id}
            </div>
        </main>
    )
}