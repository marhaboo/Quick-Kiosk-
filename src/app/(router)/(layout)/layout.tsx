import { Sidebar } from "@/widgets/sidebar/sidebar"
import type React from "react"

const WithSidebarLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
<div className="relative min-h-screen bg-black bg-[url('/images/bg-of-site.png')] bg-no-repeat bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:z-0">
  <div className="relative z-10 px-12 py-6 text-white">
      <Sidebar />
      <main className="flex-1 ml-20">
        {" "}
        {children}
      </main>
    </div>
    </div>
      
  )
}

export default WithSidebarLayout
