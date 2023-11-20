import "@/styles/globals.css"

import { BottomNav, SideNav } from "@/components/navigation"

import { Inter as FontSans } from "next/font/google"
import SessionProvider from "@/components/providers/session-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <main className="flex flex-col sm:flex-row">
              {/* <MainNavigation /> */}
              <div className="z-10">
                <SideNav />
                <BottomNav />
              </div>
              <div className="z-0 w-full flex min-h-screen flex-col justify-start space-y-2 px-8 py-6">
                {children}
              </div>
            </main>
          </SessionProvider>
        </ThemeProvider>

      </body>
    </html>
  )
}
