"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button"

type PaginationProps = {
    pages: number;
    size: number;
}

export const Pagination = ({ pages, size }: PaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const currentPage = Number(searchParams.get('page')) || 1;
    const currentSize = Number(searchParams.get('size')) || size;

    const setPaginationParams = (key: "page" | "size", value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-end space-x-2">
            <div className="text-sm font-medium">Results per page</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{currentSize}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={currentSize.toString()} onValueChange={(value) => setPaginationParams("size", Number(value))}>
                        <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex min-w-[100px] items-center justify-center text-sm font-medium">
                {pages > 1 && `Page ${currentPage} of ${pages}`}
            </div>
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