"use client"

import { Action, FreezeActionWithDescriptionFormValues } from "@/lib/definitions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { FormButtons } from "@/components/form/form-buttons";
import { FormError } from "../form/form-error";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { freezeActionWithDescriptionSchema } from "@/lib/validators";
import { updateFreezeStatus } from "@/lib/action";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

type ActionFormWithDescriptionProps = {
    id: number;
    action: Action;
    children: React.ReactNode;
}

export const ActionFormWithDescription = ({ id, action, children }: ActionFormWithDescriptionProps) => {
    const form = useForm<FreezeActionWithDescriptionFormValues>({
        resolver: zodResolver(freezeActionWithDescriptionSchema),
        defaultValues: { id: Number(id), action }
    })

    const [executeAction, error] = useAsyncAction<FreezeActionWithDescriptionFormValues>(updateFreezeStatus);

    const onSubmit = async (data: FreezeActionWithDescriptionFormValues) => {
        await executeAction(data);
    };

    return (
        <div className="space-y-4">
            {children}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Staff description */}
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
                    <FormError message={error?.message} />
                    <FormButtons validateText={action} />
                </form >
            </ Form >
        </div>

    )
}
