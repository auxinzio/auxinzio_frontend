'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Rocket, Users, TrendingUp, Heart, IndianRupee, Home, GraduationCap, MapPin, Briefcase, Clock, ArrowRight, ChevronRight, Globe, Zap, Coffee, Umbrella } from 'lucide-react';
import Image from 'next/image';
import { useSettings } from "@/app/Context/SettingsContext";
import ProgressBar from '@/components/ui/ProgressBar';
import CareerSkeleton from '@/components/ui/CareerSkeleton';
// Values for the bento grid
const careerValues = [
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We push boundaries and explore new possibilities every day in the heart of ed-tech.',
    color: '#14b88f', // Teal
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
    color: '#14b88f',
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
    <div className="min-h-screen bg-white selection:bg-[#14b88f]/10">
      {/* Progress Bar */}
      <ProgressBar />
      {/* --- HERO SECTION: THREE-ZONE ASYMMETRICAL --- */}
      <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-22 px-6 overflow-hidden bg-white">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Zone 1: Artistic Collage (Moved to Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-6 relative order-2 lg:order-1"
            >
              <div className="grid grid-cols-3 gap-2 lg:gap-3 items-start">
                {/* Column 1 */}
                <div className="space-y-2 lg:space-y-3">
                  <div className="relative aspect-[3/2] rounded-xl lg:rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                      src="/assets/img/careers/team2.webp"
                      alt="Team Event"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative aspect-[1/2] rounded-xl lg:rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                      src="/assets/img/careers/team1.webp"
                      alt="Team Working"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-2 lg:space-y-3 pt-8 lg:pt-12">
                  <div className="relative aspect-[2/3] rounded-xl lg:rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                      src="/assets/img/careers/team3.webp"
                      alt="Collaboration"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl lg:rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                      src="/assets/img/careers/team4.webp"
                      alt="Office Life"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-2 lg:space-y-3 pt-16 lg:pt-24 relative top-[10%]">
                  <div className="relative aspect-[4/5] rounded-xl lg:rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                      src="/assets/img/careers/team5.webp"
                      alt="Social Impact"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Zone 2: Text Content (Moved to Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2"
            >
              <div className="relative z-10">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-2">
                  Join our fast Growing Team
                </h1>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-medium bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5 italic leading-tight tracking-tight mb-12">
                  have an outsized impact
                </h2>

                <div className="flex flex-wrap items-center gap-8">
                  <button
                    onClick={scrollToPositions}
                    className="group relative px-8 py-4 bg-white border border-gray-200 text-gray-800 rounded-xl font-medium transition-all hover:border-[#14b88f] hover:shadow-xl hover:shadow-[#14b88f]/10"
                  >
                    See Open Positions
                  </button>
                </div>
              </div>

              {/* Decorative CTA Stats - Subtle version of what was below */}
              {/* <div className="mt-12 flex gap-12 items-center">
                <div>
                  <p className="text-2xl font-light text-gray-900">50+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Team Size</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-gray-900">12</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Nationalities</p>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- VALUES & BENEFITS: REFINED LAYOUT --- */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* Content Zone (Text Left) */}
            <div className="lg:col-span-6">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs tracking-[0.25em] uppercase font-bold mb-8 bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5"
              >
                Culture & DNA
              </motion.p>
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                We find partners,<br />
                <span className="italic font-medium bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">not just employees.</span>
              </h2>
              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-xl mb-12">
                Our culture is built on radical transparency, obsessed user-centricity, and the relentless pursuit of better solutions. We empower you to lead.
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-10">
                {benefits.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#14b88f]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#14b88f]" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Zone (Staggered Grid Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/assets/img/careers/team3.webp"
                      alt="Culture"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/assets/img/careers/team4.webp"
                      alt="Collaboration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Detailed Values Grid */}
          <div className="mt-24 lg:mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-[#14b88f]/30 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-[#14b88f]/10 transition-all duration-500">
                  <val.icon className="w-6 h-6 text-gray-900 group-hover:text-[#14b88f]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{val.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OPEN POSITIONS: SIDE-BY-SIDE EDITORIAL LIST --- */}
      <section ref={positionsRef} className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6">
          {isLoading ? (
            <CareerSkeleton />
          ) : (
            <div className="grid lg:grid-cols-12 gap-16">

              {/* Left: Sticky Filter Sidebar */}
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                  <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-bold mb-10">
                    Current Openings
                  </p>
                  <h2 className="text-4xl font-light text-gray-900 mb-12 tracking-tight">
                    Join our<br /><span className="bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5 italic font-medium">collective.</span>
                  </h2>

                  <div className="grid grid-cols-2 gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`group flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 ${activeFilter === filter
                          ? 'bg-[#14b88f] text-white shadow-xl shadow-[#14b88f]/20'
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
                  {filteredJobs.length > 0 ? (
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
                            className="group block bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:border-[#14b88f] hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.1)] relative overflow-hidden"
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1 relative z-10">
                              <div className="max-w-xl">
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#14b88f] py-1 px-3 bg-[#14b88f]/5 rounded-full">
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
                              </div>

                              <div className="flex items-center gap-6 md:w-[40%] w-full md:justify-end justify-between">
                                <div className="md:text-right">
                                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Type</p>
                                  <p className="text-sm font-bold text-gray-700">{job.type}</p>
                                </div>
                                <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b88f] group-hover:border-[#14b88f] transition-all duration-500">
                                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                </div>
                              </div>
                            </div>

                            <div className="absolute left-0 bottom-0 top-0 w-1 bg-[#14b88f] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
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
          )}
        </div>
      </section>

      {/* --- ARCHITECTURAL DIVIDER BEFORE FOOTER --- */}
      <div className="px-6 mx-auto max-w-[1600px]">
        <div className="h-px bg-gradient-to-r from-transparent via-[#14b88f]/20 to-transparent" />
      </div>

    </div>
  );
}
