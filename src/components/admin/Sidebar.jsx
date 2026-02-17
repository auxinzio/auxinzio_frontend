'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard,
  Wrench , 
  Package ,
  Lightbulb ,
  Briefcase, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  Mail,
  MessageSquare ,
  LogOut, 
  HelpCircle,
  Menu, 
  X 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/app/Context/AuthContext'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Wrench  },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Solutions', href: '/admin/solutions', icon: Lightbulb },
  { name: 'Teams', href: '/admin/teams', icon: Users },
  { name: 'Careers', href: '/admin/careers', icon: Briefcase },
  { name: 'Subscribers', href: '/admin/subscribers', icon: Mail },
  { name: 'Feedbacks', href: '/admin/feedbacks', icon: MessageSquare },
  { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white">
              A
            </div>
            <span>Admin</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  isActive 
                    ? "bg-green-50 text-green-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon 
                  size={20} 
                  className={cn(
                    "transition-colors",
                    isActive ? "text-green-500" : "text-gray-400 group-hover:text-gray-600"
                  )} 
                />
                {item.name}
              </Link>
            )
          })}

          <div className="pt-4 mt-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </nav>
      </motion.aside>
    </>
  )
}
