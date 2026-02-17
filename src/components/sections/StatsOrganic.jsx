
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Globe } from 'lucide-react';

const stats = [
  { 
    id: 1, 
    label: "Years Helping Business", 
    value: "3+", 
    color: "#22c55e", 
    icon: TrendingUp 
  },
  { 
    id: 2, 
    label: "Working Employees", 
    value: "50+", 
    color: "#06b6d4", 
    icon: Users 
  },
  { 
    id: 3, 
    label: "Complete Projects", 
    value: "100+", 
    color: "#14b8a6", 
    icon: Zap 
  },
  { 
    id: 4, 
    label: "Happy Customers", 
    value: "50+", 
    color: "#22c55e", 
    icon: Globe 
  },
];

export function StatsOrganic() {
  return (
    <section className="py-24 px-4 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-800">Impact by the numbers</h2>
        </div>

        <div className="relative flex flex-wrap justify-center gap-12 md:gap-20">
          {/* Connecting line (decorative) */}
          <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 -z-0 hidden md:block opacity-30">
             <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
               <path d="M0,100 C200,200 400,0 600,100 C800,200 1000,0 1200,100" fill="none" stroke="url(#gradient-line)" strokeWidth="3" />
               <defs>
                 <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#22c55e" />
                   <stop offset="50%" stopColor="#06b6d4" />
                   <stop offset="100%" stopColor="#14b8a6" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
              className="relative z-10 flex flex-col items-center justify-center w-55 h-55 text-center"
            >
              {/* Organic Blob Background */}
              <div className="absolute inset-0 z-0">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
                  <path fill={stat.color} d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.1,22.9,71.2,34.9C60.2,46.9,49.7,57.3,37.3,64.3C24.9,71.3,10.7,74.9,-2.4,79C-15.5,83.1,-29.9,87.7,-42.6,83.3C-55.3,78.9,-66.2,65.5,-75.2,50.7C-84.2,35.9,-91.3,19.7,-90.7,3.9C-90.1,-11.9,-81.8,-27.3,-71.4,-40.5C-61,-53.7,-48.5,-64.7,-35.3,-72.4C-22.1,-80.1,-8.2,-84.5,4.7,-92.6L17.6,-100.7" transform="translate(100 100) scale(1.1)" />
                </svg>
              </div>
              
              {/* Rotating Border Ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-slate-300 animate-[spin_10s_linear_infinite]" />
              
              {/* Content */}
              <div className="relative z-10 p-6 bg-white rounded-full w-48 h-48 flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <stat.icon className="mb-2" size={24} color={stat.color} />
                <h3 className="text-4xl font-black text-slate-800 tracking-tight" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mt-1">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
