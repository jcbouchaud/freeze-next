"use client"

import { Action, FreezeActionFormValues } from "@/lib/definitions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { FormButtons } from "@/components/form/form-buttons";
import { FormError } from "../form/form-error";
import { Textarea } from "../ui/textarea";
import { freezeActionSchema } from "@/lib/validators";
import { updateFreezeStatus } from "@/lib/action";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

type ActionFormProps = {
    id: number;
    action: Action;
    children: React.ReactNode;
}

export const ActionForm = ({ id, action, children }: ActionFormProps) => {
    const form = useForm<FreezeActionFormValues>({
        resolver: zodResolver(freezeActionSchema),
        defaultValues: { id: Number(id), action }
    })

    const updateFreezeStatusWithPath = updateFreezeStatus.bind(null, "userId")

    const [executeAction, error] = useAsyncAction<FreezeActionFormValues>(updateFreezeStatusWithPath);

    const onSubmit = async (data: FreezeActionFormValues) => {
        await executeAction(data);
    };

    const displayStaffDescriptionInput = ["approve", "force-approve", "reject", "cancel"].includes(action)


    return (
        <div className="space-y-4">
            {children}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Staff description */}
                    {
                        displayStaffDescriptionInput &&
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="staffDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit more about this freeze"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    }
                    <FormError message={error?.message} />
                    <FormButtons validateText={action} />
                </form >
            </ Form >
        </div>

    )
}
