'use client'

import { useState } from 'react'
import { useAuth } from '@/app/Context/AuthContext'
import AdminSidebar from '@/components/admin/Sidebar'
import AdminHeader from '@/components/admin/Header'

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading session...</p>
        </div>
      </div>
    )
  }

  // Double check authentication on client side
  if (!isAuthenticated && !isLoading) {
    return null; // The middleware handles redirect, return null here to avoid rendering protected content
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content — padding adjusts with sidebar width */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-64'}`}>
        <AdminHeader setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

