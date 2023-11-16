import "@/styles/globals.css"

import { Inter as FontSans } from "next/font/google"
import { MainNavigation } from "@/components/navigation"
import SessionProvider from "@/components/session-provider"
import { cn } from "@/lib/utils"
import { getServerSession } from "next-auth"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased pb-4",
          fontSans.variable
        )}
      >
        <SessionProvider session={session}>
          <main>
            <MainNavigation />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
