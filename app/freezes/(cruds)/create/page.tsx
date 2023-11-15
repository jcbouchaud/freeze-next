import Breadcrumbs from "@/components/breadcrumbs";
import { CreateForm } from "@/components/freezes/create-form";

export default function Create() {
    const breadcrumbs = [
        { label: 'Freezes', href: '/freezes' },
        {
            label: 'Create Freeze',
            href: `/freezes/create`,
            active: true,
        },
    ]

    return (
        <main className="space-y-6">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="w-full">
                <CreateForm />
            </div>
        </main>
    )
}