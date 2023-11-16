import { z } from "zod"

export const ReasonSchema = z.union([
    z.literal("personal"),
    z.literal("medical"),
    z.literal("professional")
])

export const CategorySchema = z.union([
    z.literal("bonus"),
    z.literal("compensation"),
    z.literal("regular")
])

export const datesRangeSchema = z.object({
    from: z.date(),
    to: z.date()
})

export const freezeCreateSchema = z.object({
    userId: z.string(),
    reason: ReasonSchema,
    category: CategorySchema,
    datesRange: datesRangeSchema,
    staffDescription: z.string().optional()
})