import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { Freeze } from "@/lib/definitions"

type DescriptionColumnProps = Pick<Freeze, "staff_description" | "student_description">

export const DescriptionColumn = ({ staff_description, student_description }: DescriptionColumnProps) => {
    const renderDescription = (description: string) => {
        const ellipsisLength = 60

        if (description.length >= ellipsisLength) {
            return (
                <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                        {description.slice(0, ellipsisLength)}...
                    </HoverCardTrigger>
                    <HoverCardContent className="break-words w-full max-w-md">
                        {description}
                    </HoverCardContent>
                </HoverCard>
            )
        }

        return <div>{description}</div>
    }

    if (staff_description) {
        return renderDescription(`Staff: ${staff_description}`)
    }
    else if (student_description) {
        return renderDescription(`Student: ${student_description}`)
    }

    return <div>Pas de description</div>
}
