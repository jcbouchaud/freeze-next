import { ReactNode } from "react"

export const SearchGroup = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-wrap sm:flex-nowrap flex flex-row gap-1.5 w-full">{children}</div>
    )
}
