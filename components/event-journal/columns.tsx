"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/lib/definitions";
import { format } from "date-fns";

export const columns: ColumnDef<Event>[] = [
    {
        accessorKey: "ts",
        header: "Date",
        cell: ({ row }) => {
            const { ts } = row.original
            return (
                <div>
                    <p className="font-bold">{format(new Date(ts), 'MMM dd, yyyy')}</p>
                    <p className="text-muted-foreground italic">{format(new Date(ts), 'kk:mm:ss')}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "login",
        header: "Login",
        cell: ({ row }) => (
            <div>{row.getValue("login")}</div>
        ),
    },
    {
        accessorKey: "campus_name",
        header: "Campus",
        cell: ({ row }) => {
            const { campus_city, campus_name } = row.original
            return (
                <div>
                    <p className="font-bold">{campus_name}</p>
                    <p>{campus_city}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => (
            <div>{row.getValue("source")}</div>
        ),
    },
    {
        accessorKey: "result",
        header: "Result",
        cell: ({ row }) => (
            <div>{row.getValue("result")}</div>
        ),
    }
]
