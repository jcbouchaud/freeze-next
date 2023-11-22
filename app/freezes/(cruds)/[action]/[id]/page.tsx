import Breadcrumbs from "@/components/breadcrumbs";
import { Action } from "@/lib/definitions";
import { ActionForm } from "@/components/freezes/action-form";
import { ActionFormWithDescription } from "@/components/freezes/action-form-with-description";
import { ActionSummary } from "@/components/freezes/action-summary";
import { notFound } from "next/navigation";
import { actionSchema } from "@/lib/validators";
import { Suspense } from "react";
import { ActionSummarySkeleton } from "@/components/freezes/action-summary-skeleton";


export default async function Action({ params }: { params: { id: number, action: Action } }) {
    const { id, action } = params
    
    if (!actionSchema.parse(action)) return notFound()


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
                        <Suspense fallback={<ActionSummarySkeleton />}>
                            <ActionSummary id={id} action={action} />
                        </Suspense>
                    </ActionFormWithDescription>
                }
                {["interrupt", "revert"].includes(action) &&
                    <ActionForm id={id} action={action}>
                        <Suspense fallback={<ActionSummarySkeleton />}>
                            <ActionSummary id={id} action={action} />
                        </Suspense>
                    </ActionForm>
                }
            </div>
        </main>
    )
}
