"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { FilterKeysOfType } from "@/lib/definitions";
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { useState } from "react";

type SearchCalendarProps<T> = { name: FilterKeysOfType<T, Date>[keyof T], placeholder?: string }

export function SearchCalendar<T>({ name, placeholder }: SearchCalendarProps<T>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [date, setDate] = useState<Date>();

    const handleSearch = (value: Date | undefined) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (value) {
            params.set(name as string, value.toISOString());
        } else {
            params.delete(name as string);
        }

        setDate(value)
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    <span className="mr-2">{placeholder ?? name as string}: </span>
                    {date && (
                        <span>{format(date, "LLL dd, y")}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => handleSearch(date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
