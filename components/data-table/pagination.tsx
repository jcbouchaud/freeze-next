"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button"

type PaginationProps = {
    pages: number;
    size: number;
}

export const Pagination = ({ pages, size }: PaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const currentPage = Number(searchParams.get('page')) || 1;
    
    const setPaginationParams = (key: "page" | "size", value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value.toString());
        replace(`${pathname}?${params.toString()}`);
    };
    
    return (
        <div className="flex items-center justify-end space-x-2">
            <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPaginationParams("page", 1)}
                disabled={currentPage === 1}
            >
                <span className="sr-only">go_to_first_page</span>
                <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPaginationParams("page", currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span className="sr-only">go_to_previous_page</span>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPaginationParams("page", currentPage + 1)}
                disabled={currentPage === pages}
            >
                <span className="sr-only">go_to_next_page</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPaginationParams("page", pages)}
                disabled={currentPage === pages}
            >
                <span className="sr-only">go_to_last_page</span>
                <ChevronsRight className="h-4 w-4" />
            </Button>
        </div>
    )
}