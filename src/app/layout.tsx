import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

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
          <main className="flex-1 bg-gray-50">{children}</main>
      </body>
    </html>
  )
}
