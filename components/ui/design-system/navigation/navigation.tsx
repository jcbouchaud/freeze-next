// "use client"

import { NavigationItem } from "./navigation-item";
import { NavigationList } from "./navigation-list";
import { ReactNode } from "react";

export const Navigation = ({ children }: { children: ReactNode }) => {
  return (
      <nav className="z-10 w-screen h-16 py-2 fixed border-t-muted bottom-0 l-0 flex flex-row items-center justify-around bg-background sm:bg-background sm:sticky sm:top-0 sm:w-16 lg:w-52 sm:h-screen border border-r-muted sm:flex-col sm:items-center p-2 lg:bg-accent">
        {children}
      </nav>
  )
}

Navigation.Item = NavigationItem
Navigation.List = NavigationList
