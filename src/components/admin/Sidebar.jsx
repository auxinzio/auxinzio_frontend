'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wrench,
  Package,
  Lightbulb,
  Briefcase,
  Users,
  Settings,
  Mail,
  MessageSquare,
  LogOut,
  HelpCircle,
  FileUser,
  X,
  MessageCircleHeart,
  SquareUser,
  Toolbox,
  ChevronsLeft,
  ChevronsRight,
  ShieldUser,
  Handshake,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/app/Context/AuthContext'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Solutions', href: '/admin/solutions', icon: Lightbulb },
  { name: 'Teams', href: '/admin/teams', icon: Handshake },
  { name: 'Careers', href: '/admin/careers', icon: Briefcase },
  { name: 'Applications', href: '/admin/applications', icon: FileUser },
  { name: 'Subscribers', href: '/admin/subscribers', icon: Mail },
  { name: 'Feedbacks', href: '/admin/feedbacks', icon: MessageSquare },
  { name: 'Chatbot', href: '/admin/chat', icon: MessageCircleHeart },
  { name: 'Contact', href: '/admin/contact', icon: SquareUser },
  { name: 'Enquiry', href: '/admin/enquiry', icon: Toolbox },
  { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Users', href: '/admin/users', icon: ShieldUser },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) {
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
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-gray-200 transform transition-transform duration-300 md:translate-x-0 overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-gray-100 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-between px-6"
        )}>
          {/* Logo always visible */}
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 group transition-all duration-300 shrink-0"
          >
            <div className="relative flex items-center justify-center w-9 h-9 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden shrink-0 group-hover:shadow-md transition-shadow">
              <Image
                src="/favicon.png"
                alt="Logo"
                width={26}
                height={26}
                className="relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col overflow-hidden whitespace-nowrap"
                >
                  <span className="text-2xl font-bold text-gray-900 tracking-tighter leading-tight">
                    Auxinzio
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase">
                    Admin
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile close — only when expanded on mobile */}
          {!isCollapsed && (
            <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 shrink-0">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] flex flex-col scrollbar-hide">
          <div className="flex-1 space-y-1">
            {/* Collapse / Expand toggle — desktop only */}
            <button
              onClick={() => setIsCollapsed(prev => !prev)}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={cn(
                "hidden md:flex w-full items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200",
                isCollapsed ? "justify-center" : ""
              )}
            >
              {isCollapsed
                ? <ChevronsRight size={20} className="shrink-0" />
                : <><ChevronsLeft size={20} className="shrink-0" /><span className="whitespace-nowrap">Collapse</span></>
              }
            </button>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group text-sm font-medium relative",
                    isCollapsed ? "justify-center" : "",
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "transition-colors shrink-0",
                      isActive ? "text-green-500" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              )
            })}
          </div>

          {/* Logout + Collapse toggle pinned at bottom */}
          <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
            <button
              onClick={handleLogout}
              title={isCollapsed ? 'Logout' : undefined}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <LogOut size={20} className="shrink-0" />
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            
          </div>
        </nav>
      </motion.aside>
    </>
  )
}
