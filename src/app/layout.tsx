import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./(router)/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Рестораны Душанбе",
  description: "Лучшие рестораны и кафе Душанбе",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-black">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
