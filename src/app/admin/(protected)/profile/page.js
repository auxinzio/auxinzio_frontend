"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  MapPin, 
  Activity, 
  Lock, 
  Camera, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  History,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuth } from '@/app/Context/AuthContext'
import { cn } from '@/lib/utils'
import { useSettings } from "@/app/Context/SettingsContext";
import { cmsApi } from '@/lib/cms-api';


export default function Profile() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessLocked, setIsSuccessLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [feedback, setFeedback] = useState({ message: '', type: null });
  const [errors, setErrors] = useState({});


  const { user } = useAuth();
  const { settings } = useSettings();
  
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch fresh identity data through the secure protocol proxy
        const data = await cmsApi.post('/auth/profile', {});
        if (data.statuscode === 200 ) {
            setProfile(data.data.user);
        }
    } catch (err) {
        console.error("Identity synchronization failed:", err);
    }
};
fetchProfile();
}, []);

  useEffect(() => {
    let timer;
    if (isSuccessLocked && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isSuccessLocked) {
      setCurrentPassword('');
      setNewPassword('');
      setIsSuccessLocked(false);
      setFeedback({ message: '', type: null });
    }
    return () => clearInterval(timer);
  }, [isSuccessLocked, countdown]);

  // Extracting from fresh profile if available, falling back to auth context
  const userData = profile;
  const displayName = userData?.name || 'Authorized Admin';
  const displayEmail = userData?.email || 'admin@auxinzio.io';
  const displayRole = userData?.role || 'System Administrator';


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const validate = () => {
    const newErrors = {};
    if (!currentPassword) newErrors.currentPassword = "Required";
    if (!newPassword) {
      newErrors.newPassword = "Required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Minimum 6 characters required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFeedback({ message: '', type: null });

    try {
        const response = await cmsApi.post('/auth/changePassword', 
          { old_password: currentPassword, new_password: newPassword },
          { skipRedirect: true }
        );

      if (response.statuscode === 200 || response.status === "ok") {
        setFeedback({ message: response.message || 'Identity credentials updated successfully.', type: 'success' });
        setIsSuccessLocked(true);
        setCountdown(10);
      } else {
        setFeedback({ message: response.message || 'Verification failed. Protocol rejected.', type: 'error' });
      }
    } catch (error) {
      setFeedback({ message: 'Network synchronization failed. Protocol interrupted.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-2 block">
            Security Control
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Identity <span className="italic font-normal text-primary">Overview.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-xl">
            <ShieldCheck size={16} className="text-green-500" />
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Session Valid</span>
          </div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid lg:grid-cols-12 gap-8"
      >
        {/* --- LEFT COLUMN: PROFILE CARD --- */}
        <motion.div variants={item} className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
            {/* Header Accent */}
            <div className="h-32 bg-gray-900 relative">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl shadow-gray-200/50">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-primary to-green-400 flex items-center justify-center text-white text-3xl font-black italic select-none">
                      {displayName?.charAt(0)}
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center border-4 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <Camera size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-16 pb-10 px-8 text-center">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1 uppercase">
                {displayName}
              </h2>
              <p className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                {displayRole}
              </p>

              <div className="flex justify-center gap-2 mb-8">
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg flex items-center gap-2">
                  <Shield size={12} className="text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Tier 1 Access</span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-50 text-left">
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-100 transition-colors">
                  <Mail size={16} className="text-gray-400" />
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Protocol Email</p>
                    <p className="text-sm font-medium text-gray-700">{displayEmail}</p>
                  </div>
                </div>
                {/* <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-100 transition-colors">
                  <Smartphone size={16} className="text-gray-400" />
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Secure Link</p>
                    <p className="text-sm font-medium text-gray-700">+91 ••••• ••{userData?.phone?.slice(-2) || '24'}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* <div className="bg-gradient-to-br from-primary to-green-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Sync Infrastructure</h3>
              <p className="text-white/80 text-xs font-medium leading-relaxed mb-6">Your account is synchronized with Global Node 01-A for real-time monitoring.</p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] bg-white text-gray-900 px-5 py-3 rounded-xl transition-all hover:gap-4 active:scale-95">
                Check Status <ArrowRight size={14} />
              </button>
            </div>
            <Activity size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12 transition-transform group-hover:scale-110" />
          </div> */}
        </motion.div>

        {/* --- RIGHT COLUMN: DETAILS & SETTINGS --- */}
        <motion.div variants={item} className="lg:col-span-8 space-y-8">
          {/* PERSONAL INFO CARD */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 hidden lg:block">
              <User size={40} className="text-gray-50" />
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                Principal <span className="italic font-normal text-primary">Identification.</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-5">
                <div className="group border-b border-gray-100 pb-3 transition-colors focus-within:border-primary">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Name</label>
                  <p className="text-lg font-medium text-gray-900">{displayName}</p>
                </div>
                <div className="group border-b border-gray-100 pb-3 transition-colors focus-within:border-primary">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Email</label>
                  <p className="text-lg font-medium text-gray-900">{displayEmail}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="group border-b border-gray-100 pb-3 transition-colors focus-within:border-primary">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Role</label>
                  <p className="text-lg font-medium text-gray-900">{displayRole}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-50">
              <div className="max-w-2xl">
                <div className="mb-10">
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    Security <span className="italic font-normal text-primary">Protocol.</span>
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Manage your administrative access credentials.</p>
                </div>

                <form onSubmit={handleUpdatePassword} className="grid md:grid-cols-2 gap-8 items-end">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 h-full w-full">
                        <div className={cn(
                          "h-full w-full rounded-2xl bg-gray-50 border transition-all duration-300",
                          errors.currentPassword ? "border-red-200 bg-red-50/30" : "border-gray-200 group-focus-within/input:border-primary/50 group-focus-within/input:bg-white"
                        )} />
                      </div>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          if (errors.currentPassword) setErrors({...errors, currentPassword: null});
                        }}
                        className="relative w-full bg-transparent px-5 py-4 text-gray-900 placeholder-gray-300 focus:outline-none transition-all font-medium pr-12"
                        required
                        disabled={isSuccessLocked}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{errors.currentPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 h-full w-full">
                        <div className={cn(
                          "h-full w-full rounded-2xl bg-gray-50 border transition-all duration-300",
                          errors.newPassword ? "border-red-200 bg-red-50/30" : "border-gray-200 group-focus-within/input:border-primary/50 group-focus-within/input:bg-white"
                        )} />
                      </div>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (errors.newPassword) setErrors({...errors, newPassword: null});
                        }}
                        className="relative w-full bg-transparent px-5 py-4 text-gray-900 placeholder-gray-300 focus:outline-none transition-all font-medium pr-12"
                        required
                        disabled={isSuccessLocked}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{errors.newPassword}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || isSuccessLocked}
                      className={cn(
                        "md:w-auto bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.3em] px-10 py-5 rounded-2xl hover:bg-black transition-all active:scale-95 flex items-center gap-3 justify-center",
                        (isSubmitting || isSuccessLocked) && "opacity-50 cursor-not-allowed scale-100"
                      )}
                    >
                      {isSubmitting ? "Processing..." : isSuccessLocked ? "Protocol Locked" : "Sync Credentials"}
                      <ArrowRight size={14} className={cn(!isSubmitting && !isSuccessLocked && "group-hover:translate-x-1 transition-transform")} />
                    </button>

                    <AnimatePresence>
                      {feedback.message && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className={cn(
                            "flex-1 md:max-w-md p-4 rounded-2xl border text-[10px] font-bold uppercase tracking-widest flex items-center gap-3",
                            feedback.type === 'success' 
                              ? "bg-green-50 border-green-100 text-green-600" 
                              : "bg-red-50 border-red-100 text-red-500"
                          )}
                        >
                          <div className={cn(
                            "w-2 h-2 rounded-full animate-pulse",
                            feedback.type === 'success' ? "bg-green-500" : "bg-red-500"
                          )} />
                          {feedback.message}
                          {isSuccessLocked && <span className="ml-auto opacity-50 font-normal underline">Unlock in {countdown}s</span>}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}