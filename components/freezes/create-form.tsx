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
import { cn, formatDurationFromInterval } from "@/app/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createFreeze } from "@/app/lib/action";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

const ReasonSchema = z.union([
    z.literal("personal"),
    z.literal("medical"),
    z.literal("professional")
])

const CategorySchema = z.union([
    z.literal("bonus"),
    z.literal("compensation"),
    z.literal("regular")
])

const datesRangeSchema = z.object({
    from: z.date(),
    to: z.date()
})

// const datesRangeSchema = z.object({
//     from: z.union([z.date(), z.undefined()]),
//     to: z.date().optional()
// })

const freezeCreateSchema = z.object({
    userId: z.string(),
    reason: ReasonSchema,
    category: CategorySchema,
    datesRange: datesRangeSchema,
    staffDescription: z.string().optional()
})

export type FreezeFormValues = z.infer<typeof freezeCreateSchema>

export const CreateForm = () => {
    const form = useForm<FreezeFormValues>({
        resolver: zodResolver(freezeCreateSchema),
    })

    const router = useRouter()
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(data => createFreeze(data))}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6 max-w-3xl">
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
                                                        "w-[300px] justify-start text-left font-normal",
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
                    <div className="flex flex-row justify-end">
                        <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit">Create Freeze</Button>
                    </div>
                </div>
            </form >
        </ Form >
    )
}
