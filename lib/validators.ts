import { z } from "zod"

export const reasonSchema = z.union([
    z.literal("personal"),
    z.literal("medical"),
    z.literal("professional")
])

export const categorySchema = z.union([
    z.literal("bonus"),
    z.literal("compensation"),
    z.literal("regular")
])

export const actionSchema = z.union([
    z.literal("interrupt"),
    z.literal("reject"),
    z.literal("revert"),
    z.literal("approve"),
    z.literal("force-approve"),
    z.literal("cancel"),
])

export const datesRangeSchema = z.object({
    from: z.date(),
    to: z.date()
})

export const freezeCreateSchema = z.object({
    userId: z.string(),
    reason: reasonSchema,
    category: categorySchema,
    datesRange: datesRangeSchema,
    staffDescription: z.string().optional()
})

export const freezeActionSchema = z.object({
    id: z.number(),
    action: actionSchema,
})

export const freezeActionWithDescriptionSchema = z.object({
    id: z.number(),
    action: actionSchema,
    staffDescription: z.string().optional()
})
