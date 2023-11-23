import "@/styles/globals.css"

import { Inter as FontSans } from "next/font/google"
import { MainNavigation } from "@/components/main-navigation"
import SessionProvider from "@/components/providers/session-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { authConfig } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { getServerSession } from "next-auth"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig)

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
              <MainNavigation />
              <div className="z-0 w-full flex min-h-screen flex-col justify-start space-y-2 px-8 pt-6 pb-20">
                {children}
              </div>
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
