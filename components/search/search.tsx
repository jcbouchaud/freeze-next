import { ReactNode } from "react"
import { SearchCalendar } from "./search-calendar"
import { SearchGroup } from "./search-group"
import { SearchInput } from "./search-input"
import { SearchReset } from "./search-reset"
import { SearchSelect } from "./search-select"
import { SearchURLCopy } from "./search-copy"

export const Search = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-wrap sm:flex-nowrap flex flex-row gap-1.5">{children}</div>
    )
}

Search.Input = SearchInput
Search.Select = SearchSelect
Search.Group = SearchGroup
Search.Copy = SearchURLCopy
Search.Calendar = SearchCalendar
Search.Reset = SearchReset