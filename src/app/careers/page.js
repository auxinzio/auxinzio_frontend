'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Rocket,
  Users,
  TrendingUp,
  Heart,
  IndianRupee,
  Home,
  GraduationCap,
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  ChevronRight,
  Globe,
  Zap,
  Shield,
  Coffee,
  Umbrella,
} from 'lucide-react';
import Image from 'next/image';
import { useSettings } from "@/app/Context/SettingsContext";
import ProgressBar from '@/components/ui/ProgressBar';
// Values for the bento grid
const careerValues = [
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We push boundaries and explore new possibilities every day in the heart of ed-tech.',
    color: '#14b8a6', // Teal
  },
  {
    icon: Users,
    title: 'Ownership',
    description: 'Every team member is an owner. We trust you to lead and drive impact from day one.',
    color: '#06b6d4', // Cyan
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description: 'Continuous learning is in our DNA. We invest in your professional evolution.',
    color: '#22c55e', // Green
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'We build for users and each other with kindness and deep understanding.',
    color: '#14b8a6',
  },
];

const benefits = [
  { icon: IndianRupee, label: 'Competitive Pay' },
  { icon: Home, label: 'Remote First' },
  { icon: GraduationCap, label: 'Learning Budget' },
  { icon: Zap, label: 'Latest Gear' },
  { icon: Umbrella, label: 'Premium Health' },
  { icon: Coffee, label: 'Cultural Bonds' },
];

export default function Careers() {
  const { settings } = useSettings();
  const [activeFilter, setActiveFilter] = useState('All');
  const [openings, setOpenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const positionsRef = useRef(null);

  useEffect(() => {
    if (!settings?.backend_api_url) return;

    let ignore = false;

    // We don't call setIsLoading(true) here because it's already initialized to true.
    // This avoids the "cascading render" warning.

    fetch(`${settings.backend_api_url}/api/careers/jobList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setOpenings(data.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => { ignore = true; };
  }, [settings?.backend_api_url]);

  const filters = ["All", ...new Set(openings?.careersList?.map((job) => job.department) || [])];
  const filteredJobs = (activeFilter === 'All' ? openings?.careersList : openings?.careersList?.filter((job) => job.department === activeFilter)) || [];

  const scrollToPositions = () => {
    positionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#14b8a6]/10">
      {/* Progress Bar */}
      <ProgressBar />
      {/* --- HERO SECTION: THREE-ZONE ASYMMETRICAL --- */}
      <section className="relative pt-32  pb-10 lg:pt-40 lg:pb-22 px-6 overflow-hidden">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Zone 1: Vertical Editorial Typography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 flex flex-col justify-end"
            >
              <div className="bg-gray-50/50 p-8 lg:p-12 border-l-2 border-[#14b8a6] mb-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-6 font-bold">
                  Work with us
                </p>
                <div className="space-y-1">
                  <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 leading-[0.9] tracking-tighter">
                    Build
                  </h1>
                  <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light text-[#14b8a6] leading-[0.9] tracking-tighter italic">
                    Legacy
                  </h1>
                  <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 leading-[0.9] tracking-tighter">
                    Together
                  </h1>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed max-w-sm ml-2">
                Join a world-class team of designers, engineers, and dreamers redefining the education landscape.
              </p>
            </motion.div>

            {/* Zone 2: Architectural Divider */}
            <div className="hidden lg:block lg:col-span-1 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200"></div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-1/2 top-0 w-[2px] bg-[#14b8a6]"
              />
            </div>

            {/* Zone 3: Artistic Collage & Geometric Storytelling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[16/10] lg:aspect-[16/9] w-full rounded-[2rem] overflow-hidden group">
                {/* Main Image */}
                <Image
                  src="/assets/img/careers/team1.webp"
                  alt="Team Collaboration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Overlay Glass Panel */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/40 via-transparent to-transparent" />

                {/* Geometric SVG Overlay */}
                {/* <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 800 500">
                  <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg> */}

                {/* Floating Meta Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-white/90 backdrop-blur-md p-6 border border-white/20 shadow-2xl rounded-2xl max-w-xs"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#14b8a6]" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Our Reach</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 leading-snug">
                    Operating across 5 continents with a 100% remote-first culture.
                  </p>
                </motion.div>
              </div>

              {/* Decorative CTA Line */}
              <div className="mt-12 flex items-center justify-between">
                <button
                  onClick={scrollToPositions}
                  className="group flex items-center gap-4 text-gray-900 font-medium tracking-tight hover:text-[#14b8a6] transition-colors"
                >
                  <span className="text-lg underline underline-offset-8 decoration-gray-200 group-hover:decoration-[#14b8a6] transition-all">
                    Explore Open Roles
                  </span>
                  <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#14b8a6] group-hover:bg-[#14b8a6] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>

                <div className="hidden md:flex gap-12">
                  <div>
                    <p className="text-2xl font-light text-gray-900">50+</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Team Size</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-gray-900">12</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Nationalities</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- VALUES & BENEFITS: BENTO GRID LAYOUT --- */}
      <section className="py-10 lg:py-15 bg-gray-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Bento Block 1: Intro */}
            <div className="lg:col-span-5 bg-white p-10 lg:p-16 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-xs tracking-[0.25em] uppercase text-[#14b8a6] font-bold mb-8"
                >
                  Culture & DNA
                </motion.p>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
                  We don’t just hire roles.<br />
                  <span className="font-medium italic">We find partners.</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                  Our culture is built on radical transparency, obsessed user-centricity, and the relentless pursuit of better solutions.
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-gray-100 grid grid-cols-2 gap-8">
                {benefits.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-[#14b8a6]" />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Block 2: Values (Vertical List with geometric hover) */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {careerValues.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-[2rem] border border-gray-100 group hover:border-[#14b8a6]/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#14b8a6]/10 transition-all duration-500">
                      <val.icon className="w-6 h-6 text-gray-900 group-hover:text-[#14b8a6]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{val.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  {/* Subtle Geometric Background logic from AboutSection2 style */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="10" y="10" width="80" height="80" fill="none" stroke={val.color} strokeWidth="1" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke={val.color} strokeWidth="0.5" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- OPEN POSITIONS: SIDE-BY-SIDE EDITORIAL LIST --- */}
      <section ref={positionsRef} className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left: Sticky Filter Sidebar */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-bold mb-10">
                  Current Openings
                </p>
                <h2 className="text-4xl font-light text-gray-900 mb-12 tracking-tight">
                  Join our<br /><span className="text-[#14b8a6] italic font-medium">collective.</span>
                </h2>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`group flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 ${activeFilter === filter
                        ? 'bg-[#14b8a6] text-white shadow-xl shadow-[#14b8a6]/20'
                        : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                      <span className="text-sm font-bold tracking-tight">{filter}</span>
                      {activeFilter === filter && (
                        <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Jobs Feed */}
            <div className="lg:col-span-9">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-gray-100 border-t-[#14b8a6] rounded-full animate-spin" />
                    <p className="text-sm font-medium text-gray-400 animate-pulse">Scanning opportunities...</p>
                  </div>
                ) : filteredJobs.length > 0 ? (
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                    {filteredJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Link
                          href={`/careers/${job.slug}`}
                          className="group block bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:border-[#14b8a6] hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.1)] relative overflow-hidden"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1 relative z-10">
                            <div className="max-w-xl">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#14b8a6] py-1 px-3 bg-[#14b8a6]/5 rounded-full">
                                  {job.department}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                  <MapPin className="w-3 h-3" />
                                  {job.location}
                                </span>
                              </div>
                              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:translate-x-1 transition-transform duration-300">
                                {job.title}
                              </h3>
                              {/* <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                {job.description}
                              </p> */}
                            </div>

                            <div className="flex items-center gap-6 w-[40%] justify-end">
                              <div className="hidden sm:block text-right">
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Nature</p>
                                <p className="text-sm font-bold text-gray-700">{job.type}</p>
                              </div>
                              <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b8a6] group-hover:border-[#14b8a6] transition-all duration-500">
                                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                              </div>
                            </div>
                          </div>

                          {/* Inner Decorative Accent */}
                          <div className="absolute left-0 bottom-0 top-0 w-1 bg-[#14b8a6] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-[2rem] p-20 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                      <Briefcase className="w-8 h-8 text-gray-300" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">No positions found</h4>
                    <p className="text-gray-500 max-w-xs">{`We don't have any openings in ${activeFilter} right now, but check back soon!`}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ARCHITECTURAL DIVIDER BEFORE FOOTER --- */}
      <div className="px-6 mx-auto max-w-[1600px]">
        <div className="h-px bg-gradient-to-r from-transparent via-[#14b8a6]/20 to-transparent" />
      </div>

    </div>
  );
}
