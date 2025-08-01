import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "./providers/theme-provider"
import { Providers } from "./(router)/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ResNet - Рестораны и кафе Душанбе",
  description: "Откройте для себя лучшие места для незабываемого гастрономического опыта в столице Таджикистана",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
          {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
