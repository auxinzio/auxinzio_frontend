"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Shield,
  Lock,
  Camera,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuth } from '@/app/Context/AuthContext'
import { cn } from '@/lib/utils'
import { useSettings } from "@/app/Context/SettingsContext"
import { cmsApi } from '@/lib/cms-api'

export default function Profile() {

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessLocked, setIsSuccessLocked] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [feedback, setFeedback] = useState({ message: '', type: null })
  const [errors, setErrors] = useState({})

  const { user } = useAuth()
  const { settings } = useSettings()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await cmsApi.post('/auth/profile', {})
        if (data.statuscode === 200) {
          setProfile(data.data.user)
        }
      } catch (err) {
        console.error("Profile fetch failed:", err)
      }
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    let timer
    if (isSuccessLocked && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000)
    } else if (countdown === 0 && isSuccessLocked) {
      setCurrentPassword('')
      setNewPassword('')
      setIsSuccessLocked(false)
      setFeedback({ message: '', type: null })
    }
    return () => clearInterval(timer)
  }, [isSuccessLocked, countdown])

  const userData = profile
  const displayName = userData?.name || 'Admin'
  const displayEmail = userData?.email || 'admin@auxinzio.io'
  const displayRole = userData?.role || 'System Administrator'

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }
  const item = {
    hidden: { y: 16, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  const validate = () => {
    const newErrors = {}
    if (!currentPassword) newErrors.currentPassword = "Required"
    if (!newPassword) {
      newErrors.newPassword = "Required"
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Minimum 6 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setFeedback({ message: '', type: null })

    try {
      const response = await cmsApi.post(
        '/auth/changePassword',
        { old_password: currentPassword, new_password: newPassword },
        { skipRedirect: true }
      )

      if (response.statuscode === 200 || response.status === "ok") {
        setFeedback({ message: response.message || 'Password updated successfully.', type: 'success' })
        setIsSuccessLocked(true)
        setCountdown(10)
      } else {
        setFeedback({ message: response.message || 'Update failed. Please try again.', type: 'error' })
      }
    } catch (error) {
      setFeedback({ message: 'Network error. Please try again.', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* --- PAGE HEADER --- same pattern as Dashboard --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500">Manage your account details and security settings.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-xl w-fit">
          <ShieldCheck size={15} className="text-green-500" />
          <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Session Active</span>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid lg:grid-cols-12 gap-6"
      >
        {/* --- LEFT: PROFILE CARD --- */}
        <motion.div variants={item} className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

            {/* Avatar Header */}
            <div className="h-28 bg-gray-900 relative">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg shadow-gray-200/60">
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-green-500 to-teal-400 flex items-center justify-center text-white text-2xl font-black italic select-none">
                      {displayName?.charAt(0)}
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-xl bg-gray-900 text-white flex items-center justify-center border-2 border-white shadow opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                    <Camera size={12} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-14 pb-8 px-6 text-center">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-0.5">{displayName}</h2>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-5">{displayRole}</p>

              <div className="flex justify-center mb-6">
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg flex items-center gap-2">
                  <Shield size={12} className="text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Tier 1 Access</span>
                </div>
              </div>

              <div className="space-y-2 pt-5 border-t border-gray-50 text-left">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail size={15} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</p>
                    <p className="text-sm font-medium text-gray-700">{displayEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: DETAILS & SECURITY --- */}
        <motion.div variants={item} className="lg:col-span-8 space-y-6">

          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Account Information</h3>
              <User size={18} className="text-gray-200" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Full Name</label>
                  <p className="text-base font-medium text-gray-900">{displayName}</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Email Address</label>
                  <p className="text-base font-medium text-gray-900">{displayEmail}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Role</label>
                  <p className="text-base font-medium text-gray-900">{displayRole}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
              <Lock size={18} className="text-gray-200" />
            </div>
            <p className="text-sm text-gray-500 mb-6">Update your password to keep your account secure.</p>

            <form onSubmit={handleUpdatePassword} className="grid md:grid-cols-2 gap-6 items-end">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value)
                      if (errors.currentPassword) setErrors({ ...errors, currentPassword: null })
                    }}
                    disabled={isSuccessLocked}
                    className={cn(
                      "w-full px-4 py-3 pr-11 rounded-xl border text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition-all",
                      errors.currentPassword
                        ? "border-red-200 bg-red-50/30 focus:border-red-300"
                        : "border-gray-200 bg-gray-50 focus:border-primary/50 focus:bg-white"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-xs text-red-500 font-medium">{errors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      if (errors.newPassword) setErrors({ ...errors, newPassword: null })
                    }}
                    disabled={isSuccessLocked}
                    className={cn(
                      "w-full px-4 py-3 pr-11 rounded-xl border text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition-all",
                      errors.newPassword
                        ? "border-red-200 bg-red-50/30 focus:border-red-300"
                        : "border-gray-200 bg-gray-50 focus:border-primary/50 focus:bg-white"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs text-red-500 font-medium">{errors.newPassword}</p>
                )}
              </div>

              {/* Submit + Feedback */}
              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccessLocked}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all active:scale-95",
                    (isSubmitting || isSuccessLocked) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Updating..." : isSuccessLocked ? "Locked" : "Update Password"}
                  <ArrowRight size={14} />
                </button>

                <AnimatePresence>
                  {feedback.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold",
                        feedback.type === 'success'
                          ? "bg-green-50 border-green-100 text-green-600"
                          : "bg-red-50 border-red-100 text-red-500"
                      )}
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full animate-pulse shrink-0",
                        feedback.type === 'success' ? "bg-green-500" : "bg-red-500"
                      )} />
                      {feedback.message}
                      {isSuccessLocked && (
                        <span className="ml-2 opacity-50 font-normal">Unlock in {countdown}s</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

        </motion.div>
      </motion.div>
    </div>
  )
}