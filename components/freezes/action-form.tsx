"use client"

import { Action, FreezeActionFormValues } from "@/lib/definitions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { FormButtons } from "@/components/form/form-buttons";
import { FormError } from "../form/form-error";
import { Input } from "../ui/input";
import { freezeActionSchema } from "@/lib/validators";
import { updateFreezeStatus } from "@/lib/action";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

type ActionProps = {
    id: number;
    action: Action;
    children: React.ReactNode;
}

export const ActionForm = ({ id, action, children }: ActionProps) => {
    const form = useForm<FreezeActionFormValues>({
        resolver: zodResolver(freezeActionSchema),
        defaultValues: { id: Number(id), action }
    })

    const [executeAction, error] = useAsyncAction<FreezeActionFormValues>(updateFreezeStatus);

    const onSubmit = async (data: FreezeActionFormValues) => {
        await executeAction(data);
    };

    return (
        <div>
            <div className="space-y-4">
                {children}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormError message={error?.message} />
                    <FormButtons validateText={action} />
                </form >
            </ Form >
        </div>
    )
}
