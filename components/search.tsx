"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FreezeSearchParams } from '@/app/lib/definitions';
import { Input } from "@/components/ui/input"

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (key: keyof FreezeSearchParams, value: any) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className='flex flex-col' >
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input type="user" id="user" placeholder="User" onChange={(e) => handleSearch("user", e.target.value)} />
            </div>
        </div>

    )
}