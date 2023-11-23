"use client"

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type FilterArrayKeys<T> = {
    [K in keyof T]: T[K] extends Array<string | number> ? K : never;
};

type SearchSelectProps<T> = { name: FilterArrayKeys<T>[keyof T], options: Array<{ value: string, label: string }> }

export function SearchSelect<T>({ name, options }: SearchSelectProps<T>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const values = searchParams.getAll(name as string)

    const handleSelect = (value: string | undefined) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (value === undefined) {
            params.delete(name as string)
        } else {
            if (!values.includes(value)) {
                params.append(name as string, value)
            } else {
                params.delete(name as string)
                values.filter(x => x !== value).forEach((v) => {
                    params.append(name as string, v)
                })
            }
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="border-dashed">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    <span className="capitalize">{name as string}</span>
                    {values.length > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {values.length}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {values.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {values.length} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => values.includes(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal capitalize"
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
                                const isSelected = values.includes(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => handleSelect(option.value)}
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
                                        <span className="capitalize">{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {values.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => handleSelect(undefined)}
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