"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FilterKeysOfType } from '@/lib/definitions';
import { useDebouncedCallback } from 'use-debounce';

export function useQuerySearchHandlers<T>() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const handleInputSearch = useDebouncedCallback(( name: FilterKeysOfType<T, string>[keyof T], value: string ) => {
        // const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (value) {
            params.set(name as string, value);
        } else {
            params.delete(name as string);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300)



    const handleSelectSearch = ( name: FilterKeysOfType<T, Array<string>>[keyof T], value: string ) => {
        const values = searchParams.getAll(name as string)

        // const params = new URLSearchParams(searchParams);
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

    return { handleInputSearch, handleSelectSearch }
}