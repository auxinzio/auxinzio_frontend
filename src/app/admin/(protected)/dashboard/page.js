'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { UserRound, Briefcase, Image as ImageIcon, Activity } from 'lucide-react'
import { useAuth } from '@/app/Context/AuthContext'
import { cmsApi } from '@/lib/cms-api';
import Link from 'next/link';
import { useSettings } from '@/app/Context/SettingsContext';

export default function AdminDashboard() {
  const { user } = useAuth()
  const { settings } = useSettings();
  const [data, setData] = useState({
    stats: {
      totalUsers: 0,
      totalApplications: 0,
      totalTeam: 0,
      totalCareers: 0,
      monthlyVisits: '0'
    },
    recentApplications: [],
    recentProducts: [],
    recentCareers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cmsApi.post('/dashboard');
      if (response && response.data) {
        setData({
          stats: response.data.stats || {
            totalUsers: 0,
            totalApplications: 0,
            totalTeam: 0,
            totalCareers: 0,
            monthlyVisits: '0'
          },
          recentApplications: response.data.recentApplications || [],
          recentProducts: response.data.recentProducts || [],
          recentCareers: response.data.recentCareers || []
        });
      }
    } catch (err) {
      console.error('Failed to fetch Dashboard Data:', err);
      setError('Failed to load Dashboard Data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDashboardData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchDashboardData]);

  const stats = [
    { name: 'Total Users', value: data.stats.totalUsers, change: '+12.5%', icon: UserRound, color: 'bg-green-500' },
    { name: 'Applications', value: data.stats.totalApplications, change: '+4.2%', icon: Briefcase, color: 'bg-cyan-500' },
    { name: 'Total Team', value: data.stats.totalTeam, change: '+8.1%', icon: ImageIcon, color: 'bg-teal-500' },
    { name: 'Monthly Visits', value: data.stats.monthlyVisits, change: '+24.5%', icon: Activity, color: 'bg-purple-500' },
  ]

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.user?.name || user?.user?.email?.split('@')[0] || 'Admin'}!</p>
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
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-white')}`} />
              </div>
              {/* <span className="text-sm font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span> */}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-500 text-sm mt-1">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity / Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Applications</h3>
            <Link href="/admin/applications" className="text-sm text-green-500 font-medium hover:text-green-600">View All</Link>
          </div>
          <div className="space-y-4">
            {data.recentApplications.length > 0 ? (
              data.recentApplications.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{formatTime(activity.time)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No Applications</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Careers</h3>
            <Link href="/admin/careers" className="text-sm text-green-500 font-medium hover:text-green-600">View All</Link>
          </div>
          <div className="space-y-4">
            {data.recentCareers.length > 0 ? (
              data.recentCareers.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{formatTime(activity.time)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No Careers</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Products</h3>
            <Link href="/admin/products" className="text-sm text-green-500 font-medium hover:text-green-600">View All</Link>
          </div>
          <div className="space-y-4">
            {data.recentProducts.length > 0 ? (
              data.recentProducts.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {/* <User className="w-5 h-5 text-gray-500" /> */}
                    <img src={`${settings.base_url}${activity.logo}`} alt={`${activity.product_name} image`} className="w-5 h-5 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{formatTime(activity.time)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No Products</p>
            )}
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}
