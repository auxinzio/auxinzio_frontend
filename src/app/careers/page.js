'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Rocket,
  Users,
  TrendingUp,
  Heart,
  DollarSign,
  Home,
  GraduationCap,
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import Image from 'next/image';
import { useSettings } from "@/app/Context/SettingsContext";


// Job data with IDs for routing
const jobOpenings = [
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful, performant user interfaces with React and TypeScript.',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Shape the future of our products with user-centered design.',
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    team: 'Engineering',
    location: 'San Francisco',
    type: 'Full-time',
    description: 'Build and maintain our cloud infrastructure at scale.',
  },
  {
    id: 'customer-success-manager',
    title: 'Customer Success Manager',
    team: 'Sales',
    location: 'New York',
    type: 'Full-time',
    description: 'Help our customers achieve their goals and grow with Auxinzio.',
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design and build scalable APIs and microservices.',
  },
  {
    id: 'marketing-lead',
    title: 'Marketing Lead',
    team: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive growth through compelling campaigns and strategic initiatives.',
  },
];

// Gallery images for masonry
const galleryImages = [
  '/assets/img/careers/team1.webp',
  '/assets/img/careers/team2.webp',
  '/assets/img/careers/team3.webp',
  '/assets/img/careers/team4.webp',
];

const whyJoin = [
              {
                icon: DollarSign,
                title: 'Competitive Pay',
                description:
                  'Industry-leading salaries, equity packages, and comprehensive benefits that value your contribution.',
                color: '#22c55e',
              },
              {
                icon: Home,
                title: 'Flexible Work',
                description:
                  'Work from anywhere. We support remote-first culture with the tools and trust you need to thrive.',
                color: '#06b6d4',
              },
              {
                icon: GraduationCap,
                title: 'Learning & Development',
                description:
                  'Unlimited learning budget, conference attendance, and mentorship programs to accelerate your growth.',
                color: '#14b8a6',
              },
];

export default function Careers() {
  const { settings } = useSettings();
  const [activeFilter, setActiveFilter] = useState('All');
  const positionsRef = useRef(null);
  const [openings, setOpenings] = useState([]);

  useEffect(()=>{
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/careers/jobList`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({})
    }).then((res)=>res.json()).then((data)=>{
      setOpenings(data.data);
    })
  },[settings]);

  const filters = ["All", ...new Set(openings?.careersList?.map((job) => job.department) || [])];

  const filteredJobs =
    (activeFilter === 'All' ? openings?.careersList : openings?.careersList?.filter((job) => job.department === activeFilter)) || [];

  const scrollToPositions = () => {
    positionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Left Masonry + Right Content */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Masonry Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Gradient glow behind images */}
              <div
                className="absolute inset-0 blur-3xl opacity-20"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
                }}
              ></div>

              <Masonry columnsCount={2} gutter="12px">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  >
                    <Image
                      src={image}
                      alt={`Team ${index + 1}`}
                      className="w-full h-auto transition-transform duration-300"
                      width={500}
                      loading='eager'
                      height={500}
                    />
                  </motion.div>
                ))}
              </Masonry>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                Join our fast
                <br />
                growing team
              </h1>

              {/* Handwritten accent */}
              <p
                className="text-3xl md:text-4xl mb-8 font-light italic"
                style={{ color: '#22c55e' }}
              >
                and build the future
              </p>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                We are on a mission to transform how teams collaborate and grow. Join us and make an
                impact that matters.
              </p>

              {/* CTA Button */}
              <button
                onClick={scrollToPositions}
                className="group relative px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{ backgroundColor: '#22c55e' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Open Positions
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture / Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
          >
            Our Core Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto"
          >
            These principles guide everything we do, from product decisions to how we treat each
            other.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Innovation',
                description: 'Push boundaries and explore new possibilities every day.',
                color: '#22c55e',
              },
              {
                icon: Users,
                title: 'Ownership',
                description: 'Take initiative and drive projects from idea to impact.',
                color: '#06b6d4',
              },
              {
                icon: TrendingUp,
                title: 'Growth',
                description: 'Continuous learning and improvement for everyone.',
                color: '#14b8a6',
              },
              {
                icon: Heart,
                title: 'Teamwork',
                description: 'Collaborate openly and celebrate wins together.',
                color: '#22c55e',
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-8 rounded-3xl backdrop-blur-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%)',
                  }}
                >
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `${value.color}15`,
                      border: `2px solid ${value.color}40`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits / Why Join Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
          >
            Why Join Auxinzio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto"
          >
            We invest in our people with competitive compensation, flexibility, and continuous
            learning.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoin.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-8 rounded-3xl bg-white transition-all duration-500 group cursor-pointer"
                  style={{
                    border: `1px solid ${benefit.color}20`,
                    boxShadow: `0 4px 20px ${benefit.color}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${benefit.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${benefit.color}10`;
                  }}
                >
                  {/* Gradient border glow effect */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.color}20, transparent)`,
                    }}
                  ></div>

                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.color}20, ${benefit.color}10)`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions - List Structure */}
      <section ref={positionsRef} className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
          >
            Open Positions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
          >
            Find your next opportunity and join our mission to transform how teams work.
          </motion.p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-6 py-2.5 rounded-full font-medium transition-all duration-300"
                style={{
                  backgroundColor: activeFilter === filter ? '#06b6d4' : 'white',
                  color: activeFilter === filter ? 'white' : '#6b7280',
                  border: activeFilter === filter ? 'none' : '1px solid #e5e7eb',
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.backgroundColor = '#14b8a610';
                    e.currentTarget.style.borderColor = '#14b8a6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Jobs List Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                {/* Hover highlight bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: '#22c55e' }}
                ></div>

                <Link
                  href={`/careers/${job.slug}`}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#22c55e] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className="px-4 py-1.5 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: '#14b8a615',
                          color: '#14b8a6',
                        }}
                      >
                        <Briefcase className="w-3.5 h-3.5 inline mr-1.5" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                  </div>

                  <button
                    className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap ml-0 md:ml-8"
                    style={{ backgroundColor: '#22c55e' }}
                  >
                    Apply Now
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
