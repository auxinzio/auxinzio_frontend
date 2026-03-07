import { Bell, Search, User, Menu, LogOut } from 'lucide-react'
import { useAuth } from '@/app/Context/AuthContext';
import Link from 'next/link';

export default function AdminHeader({ setIsOpen }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm md:pl-64">
      {/* ... (Mobile Toggle - Unchanged) ... */}
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-500 hover:text-gray-900 transition-colors">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4">

        <div className="h-8 w-px bg-gray-200 mx-2" />
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="text-sm font-semibold text-gray-900">{user?.user?.name || user?.user?.email}</span>
          </div>
          <div className="group relative">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-cyan-400 p-0.5 cursor-pointer">
               <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <User className="text-gray-400 w-6 h-6" />
               </div>
             </div>
             {/* Dropdown for Logout */}
             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all overflow-hidden">
              <Link href="/admin/profile">
                <button 
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <User size={16} />
                  Profile
                </button>
              </Link>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
             </div>
          </div>
        </div>
      </div>
    </header>
  )
}
