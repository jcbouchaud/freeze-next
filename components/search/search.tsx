import { CopyURL } from "./search-copy"
import { ReactNode } from "react"
import { SearchGroup } from "./search-group"
import SearchInput from "./search-input"
import { SearchSelect } from "./search-select"

export const Search = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-wrap sm:flex-nowrap flex flex-row gap-1.5">{children}</div>
    )
}

Search.Input = SearchInput
Search.Select = SearchSelect
Search.Group = SearchGroup
Search.Copy = CopyURL
