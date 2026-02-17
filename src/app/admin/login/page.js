'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, User } from 'lucide-react'
import { useAuth } from '@/app/Context/AuthContext';


export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  /* New Hook Implementation */
  const { login } = useAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Use the login function from AuthContext
    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
    // If success, user is redirected by AuthContext (or you can do it here)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md bg-opacity-95 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Login</h2>
        <p className="text-gray-500 mb-8">Access your dashboard</p>
        
        {error && <div className="mb-4 text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  )
}
