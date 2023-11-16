"use client"

import * as React from "react"

import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type Status = "approved" | "pending";

interface SearchParamsInterface {
    user: string | number;
    status: Array<Status>
}

export function useSearchFilter<T extends keyof SearchParamsInterface>(
    optionKey: string
) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const selectedValues = new Set(
        Array.from(searchParams.entries())
            .filter((x) => x[0] === optionKey)
            .map((x) => x[1] as Status | string | number)
    );

    const updateSearchFilter = (value?: SearchParamsInterface[T]) => {
        const params = new URLSearchParams(searchParams);

        // if (typeof value === "string") {
        //     // Handle string values
        //     params.set(optionKey, value);
        // } else if (Array.isArray(value)) {
        //     // Handle array values
        //     value.forEach((val) => params.append(optionKey, val as string));
        // }

        // if (value) {
        //     params.set(optionKey, value as string);
        // } else {
        //     params.delete(optionKey);
        // }
        replace(`${pathname}?${params.toString()}`);
    };

    return { selectedValues, updateSearchFilter };
}

// if (!value) {
//     params.delete(optionKey);
// } else {
//     if (selectedValues.has(value)) {
//         selectedValues.delete(value);
//         params.delete(optionKey);
//         selectedValues.forEach((val) => params.append(optionKey, val as string));
//     } else {
//         params.append(optionKey, value as string);
//     }

//     
// }
interface OptionsFilterProps<T> {
    optionKey: string;
    title?: string;
    options: {
        label: string;
        value: T;
    }[];
}


export function OptionsFilter<T extends string>({ optionKey, title, options }: OptionsFilterProps<T>) {
    const { selectedValues, updateSearchFilter } = useSearchFilter(optionKey);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value as string))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={`${option.value as T}`}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.value)

                                const values = Array.from(selectedValues)

                                if (isSelected) {
                                    values.filter(val => val !== option.value)
                                } else {
                                    values.push(option.value as T)
                                }

                                return (
                                    <CommandItem
                                        key={`${option.value as T}`}
                                    // onSelect={() => updateSearchFilter(values)}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <CheckIcon className={cn("h-4 w-4")} />
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => updateSearchFilter(undefined)}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}