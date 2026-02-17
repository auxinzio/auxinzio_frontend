'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Briefcase, 
  Image as ImageIcon, 
  TrendingUp, 
  DollarSign, 
  Activity 
} from 'lucide-react'
import { useAuth } from '@/app/Context/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()
  
  const stats = [
    { name: 'Total Users', value: '2,543', change: '+12.5%', icon: Users, color: 'bg-green-500' },
    { name: 'Active Services', value: '14', change: '+4.2%', icon: Briefcase, color: 'bg-cyan-500' },
    { name: 'Gallery Items', value: '86', change: '+8.1%', icon: ImageIcon, color: 'bg-teal-500' },
    { name: 'Monthly Visits', value: '45.2k', change: '+24.5%', icon: Activity, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name || user?.email?.split('@')[0] || 'Admin'}!</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            Export Report
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 shadow-lg shadow-green-500/20">
            Add New Service
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <span className="text-sm font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-500 text-sm mt-1">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity / Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-green-500 font-medium hover:text-green-600">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New user registered</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div> 
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
              Update Privacy Policy
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
              Manage Team Access
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
              Review Support Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function User({ className }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
