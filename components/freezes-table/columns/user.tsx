import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { User } from "@/lib/definitions"

type UserColumnProps = Pick<User, "login" | "id">

export const UserColumn = ({ id, login }: UserColumnProps) => {
    console.log(process.env.PROFILE_URL)
    console.log(id)
    const baseUrl = "https://profile.intra-staging.42.fr"
    // const baseUrl = process.env.PROFILE_URL as string
    const profileUrl = new URL(`/users/${id.toString()}`, baseUrl).toString()

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <a className="cursor-pointer text-blue-500" rel="noreferrer" target="_blank" href={profileUrl}>{login}</a>
            </HoverCardTrigger>
            <HoverCardContent className="break-words w-full max-w-md">
                <span>id: {id}</span>
            </HoverCardContent>
        </HoverCard>
    )
}