"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn, formatDurationFromInterval } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { FormButtons } from "@/components/form/form-buttons";
import { FormError } from "../form/form-error";
import { FreezeCreateFormValues } from "@/lib/definitions";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createFreeze } from "@/lib/action";
import { format } from "date-fns";
import { freezeCreateSchema } from "@/lib/validators";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateForm = () => {
    const form = useForm<FreezeCreateFormValues>({
        resolver: zodResolver(freezeCreateSchema),
    })

    const [executeAction, error] = useAsyncAction<FreezeCreateFormValues>(createFreeze);

    const onSubmit = async (data: FreezeCreateFormValues) => {
        await executeAction(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full rounded-md bg-muted p-4 md:p-6 max-w-3xl">
                    {/* User id */}
                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: xavier-n, 109307, ..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        You can search a user by login or user id
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Dates */}
                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="datesRange"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>
                                        Dates
                                        {
                                            field.value?.from && field.value?.to &&
                                            <span className='italic'>
                                                {" "}- {formatDurationFromInterval(field.value.from, field.value.to)}
                                            </span>
                                        }
                                    </FormLabel>
                                    <div className="grid gap-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value?.from ? (
                                                        field.value?.to ? (
                                                            <>
                                                                {format(field.value?.from, "LLL dd, y")} -{" "}
                                                                {format(field.value?.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(field.value?.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>
                                                            {field.value ? (
                                                                `${field.value?.from && format(field.value.from, "LLL dd, y")} - ${field.value?.to ? format(field.value.to, "LLL dd, y") : ""}`
                                                            ) : "Select a period"
                                                            }
                                                        </span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Reason */}
                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="---" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="medical">Medical</SelectItem>
                                            <SelectItem value="personal">Personal</SelectItem>
                                            <SelectItem value="professional">Professional</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Category */}
                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="---" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="regular">Regular</SelectItem>
                                            <SelectItem value="bonus">Bonus</SelectItem>
                                            <SelectItem value="compensation">Compensation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                    <FormButtons />
                </div>
            </form >
        </ Form >
    )
}
