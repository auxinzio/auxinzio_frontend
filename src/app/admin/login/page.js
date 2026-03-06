'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/app/Context/AuthContext';
import Image from 'next/image'
import { cn } from '@/lib/utils';

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { login } = useAuth();
  
  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Identifier is required';
    }
    if (!password) {
      newErrors.password = 'Credential is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await login(username, password);
      if (!result.success) {
        setError(result.message || 'Verification failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-white">
      {/* Decorative Background for the entire page (subtle) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative z-10 flex w-full flex-col lg:flex-row">
        {/* --- LEFT SIDE: BRANDING/VISUALS --- */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[45%] bg-gray-950 relative overflow-hidden flex flex-col justify-between p-12 lg:p-20 text-white shrink-0"
        >
          {/* Animated Glow Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Watermark/Background Text */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none origin-left -rotate-90 hidden lg:block">
            <h1 className="text-[18vw] font-black tracking-tighter leading-none uppercase">Auxinzio</h1>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-white p-3 shadow-2xl flex items-center justify-center mb-12"
            >
              <Image src="/favicon.png" alt="Logo" width={48} height={48} />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-5xl lg:text-7xl font-light tracking-tighter leading-tight">
                Command <br />
                <span className="italic font-normal text-primary">Infrastucture.</span>
              </h2>
              <p className="max-w-md text-gray-400 font-light text-lg leading-relaxed">
                Access your administrative console to manage systems, monitor performance, and synchronize global resources.
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 pt-12">
            <div className="flex flex-wrap gap-8">
              {[
                { icon: ShieldCheck, label: "Encrypted Session" },
                { icon: User, label: "Admin Authorized" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon size={16} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: LOGIN FORM --- */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50/50">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[480px]"
          >
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
              <div className="mb-10 text-left">
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Sign In</h3>
                <p className="text-gray-500 font-medium">Please enter your credentials to proceed.</p>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100/50 text-red-500 text-sm flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                    <p className="font-semibold tracking-tight">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleLogin} noValidate className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Identifier</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 h-full w-full">
                      <div className={cn(
                        "h-full w-full rounded-2xl bg-gray-50 border transition-all duration-300",
                        errors.username ? "border-red-500/50 bg-red-50" : "border-gray-200 group-focus-within/input:border-primary/50 group-focus-within/input:bg-white group-focus-within/input:shadow-sm"
                      )} />
                    </div>
                    <div className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                      errors.username ? "text-red-400" : "text-gray-400 group-focus-within/input:text-primary"
                    )}>
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="Username / Email"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username) setErrors({ ...errors, username: null });
                      }}
                      className="relative w-full bg-transparent pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none transition-all font-medium"
                      required
                    />
                  </div>
                  {errors.username && (
                    <p className="text-[10px] text-red-500 font-bold uppercase ml-1 tracking-widest animate-in fade-in slide-in-from-top-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Credential</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 h-full w-full">
                      <div className={cn(
                        "h-full w-full rounded-2xl bg-gray-50 border transition-all duration-300",
                        errors.password ? "border-red-500/50 bg-red-50" : "border-gray-200 group-focus-within/input:border-primary/50 group-focus-within/input:bg-white group-focus-within/input:shadow-sm"
                      )} />
                    </div>
                    <div className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                      errors.password ? "text-red-400" : "text-gray-400 group-focus-within/input:text-primary"
                    )}>
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      className="relative w-full bg-transparent pl-12 pr-12 py-4 text-gray-900 placeholder-gray-400 focus:outline-none transition-all font-medium"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 transition-colors p-1",
                        errors.password ? "text-red-400" : "text-gray-400 hover:text-gray-600"
                      )}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-500 font-bold uppercase ml-1 tracking-widest animate-in fade-in slide-in-from-top-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isLoading}
                    type="submit"
                    className="w-full relative group h-14 rounded-2xl overflow-hidden flex items-center justify-center font-bold text-white transition-all duration-300 shadow-xl shadow-primary/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-600 group-hover:opacity-90 transition-opacity" />
                    <div className="relative flex items-center gap-2">
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Access Console</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  Secure Access <ShieldCheck className="inline-block w-3 h-3 ml-1" />
                </p>
              </div>
            </div>
            
            <p className="mt-8 text-center text-gray-400 text-xs font-medium">
              Powered by <span className="text-primary font-bold italic">Auxinzio</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
