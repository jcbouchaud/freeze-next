"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FilterKeysOfType } from '@/lib/definitions';
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce';

type SearchInputProps<T> = { name?: FilterKeysOfType<T, string>[keyof T] } & React.InputHTMLAttributes<HTMLInputElement>

export function SearchInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    // const searchParams = useSearchParams();
    // const pathname = usePathname();
    // const { replace } = useRouter();

    // const handleSearch = useDebouncedCallback((value) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set('page', '1');

    //     if (value) {
    //         params.set(name, value);
    //     } else {
    //         params.delete(name);
    //     }

    //     replace(`${pathname}?${params.toString()}`);
    // }, 300)

    // return <Input className="h-9 min-w-[200px]" type="text" onChange={(e) => handleSearch(e.target.value)} {...props} />
    return <Input className="h-9 min-w-[200px]" type="text" {...props} />
}