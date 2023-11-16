"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DatesColumn } from "./dates";
import { DescriptionColumn } from "./description";
import { Freeze } from "@/lib/definitions";
import Link from "next/link";
import { StatusColumn } from "./status";
import { UserColumn } from "./user";

export const columns: ColumnDef<Freeze>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const { user: user } = row.original
            return <UserColumn id={user.id} login={user.login} />
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("reason")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const { status, approved_at, approved_by } = row.original
            return <StatusColumn approved_at={approved_at} approved_by={approved_by} status={status} />
        },
    },
    {
        accessorKey: "dates",
        header: "Dates",
        cell: ({ row }) => {
            const { effective_end_date, expected_end_date, begin_date } = row.original
            return <DatesColumn expected_end_date={expected_end_date} effective_end_date={effective_end_date} begin_date={begin_date} />
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const { student_description, staff_description } = row.original
            return <DescriptionColumn staff_description={staff_description} student_description={student_description} />
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { id } = row.original
            return (
                <div className="flex gap-2">
                    <Link href={`/freezes/${id}/cancel`}>C</Link>
                    <Link href={`/freezes/${id}/revert`}>R</Link>
                    <Link href={`/freezes/${id}/interrupt`}>I</Link>
                </div>
            )
        },
    },
]
