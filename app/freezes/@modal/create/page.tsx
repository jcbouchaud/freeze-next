"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

export default function Create() {
    const router = useRouter()

    const onOpenChange = (open: boolean) => {
        if (open) router.back()
    }

    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a freeze</DialogTitle>
                    <DialogDescription>
                        Bla bla bla
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => router.back()}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}