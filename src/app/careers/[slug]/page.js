"use client";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowLeft, IndianRupee, Home, GraduationCap, Users, CheckCircle2, Send, CloudCheck, } from 'lucide-react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSettings } from "@/app/Context/SettingsContext";
import ProgressBar from '@/components/ui/ProgressBar';

export default function JobDetailsPage() {
  const { slug } = useParams();
  const [careerData, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { settings } = useSettings();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    cover_letter: '',
    resume: '',
    job_id: '',
    designation: '',
  });

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^(?=[^@]*[a-zA-Z])[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    const phoneRegex = /^[6-9]\d{9,14}$/;

    if (!formData.applicant_name || formData.applicant_name.length < 3) newErrors.applicant_name = 'Name must be at least 3 characters.';
    
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Mobile number must start with 6-9 and be 10-15 digits.';
    }

    if (!formData.resume) newErrors.resume = 'Please upload your resume.';
    if (!formData.cover_letter || formData.cover_letter.length < 10) newErrors.cover_letter = 'Please provide a more detailed impact narrative (min 10 chars).';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(false);
    const data = {
      job_id: careerData?.job_id,
      applicant_name: formData.applicant_name,
      email: formData.email,
      phone: formData.phone,
      designation: careerData?.department,
      social_link: {
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
      },
      cover_letter: formData.cover_letter,
      resume: formData.resume,
    };
    handleSave(data, 'Career');
  };
  const handleSave = async (data, title) => {
    try {
      const applyApi = `${settings.backend_api_url}/api/applications/apply`;
      const hasFiles = Object.values(data).some(value => value instanceof File);
      let result;

      if (hasFiles) {
        const submissionData = new FormData();
        Object.keys(data).forEach(key => {
          const value = data[key];
          if (typeof value === 'object' && value !== null && !(value instanceof File)) {
            submissionData.append(key, JSON.stringify(value));
          } else {
            submissionData.append(key, value);
          }
        });
        result = await fetch(applyApi, {
          method: "POST",
          body: submissionData,
        });
      } else {
        result = await fetch(applyApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const responseData = await result.json();

      if (result.ok && (responseData.success !== false && !responseData.error)) {
        toast.success(`${title} Applied successfully!`);
        setIsSubmitted(true);
      } else {
        toast.error(`Failed to apply ${title}: ${responseData?.message || responseData?.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error applying ${title}:`, error);
      toast.error(error.message || `Failed to apply ${title}`);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  useEffect(() => {
    const fetchCareerDetail = async () => {
      if (!settings.backend_api_url) return;

      try {
        setLoading(true);
        const response = await fetch(`${settings.backend_api_url}/api/careers/jobShow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug: slug }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch service details: ${response.status}`);
        }

        const result = await response.json();

        const careerData = result.data?.careers;
        setCareer(careerData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug && settings.backend_api_url) {
      fetchCareerDetail();
    }
  }, [slug, settings.backend_api_url]);

  return (
    <>
      <div className="min-h-screen bg-gray-50/50 pt-24 pb-20 selection:bg-[#14b8a6]/10">
        {/* Progress Bar */}
        <ProgressBar />
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-[#14b8a6]/30" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#14b8a6]">Job Vacancy</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 tracking-tighter leading-tight">
                  {careerData?.title?.split(' ').map((word, i) => (
                    <span key={i}>
                      {i === 0 ? <span className="font-semibold">{word} </span> : <span className="italic">{word} </span>}
                    </span>
                  ))}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest bg-gray-50 border border-gray-100 text-gray-600 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#14b8a6]" />
                    {careerData?.department}
                  </span>
                  <span className="px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest bg-gray-50 border border-gray-100 text-gray-600 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#14b8a6]" />
                    {careerData?.location}
                  </span>
                  <span className="px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest bg-gray-50 border border-gray-100 text-gray-600 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#14b8a6]" />
                    {careerData?.type}
                  </span>
                </div>
              </div>
              <a
                href="#apply"
                className="px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest text-white bg-gray-900 transition-all duration-500 hover:bg-[#14b8a6] hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.3)] hover:-translate-y-1 whitespace-nowrap inline-block text-center shadow-2xl"
              >
                Apply for Position
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left Column: Job Details */}
            <div className="lg:col-span-2 space-y-16">

              {/* About the Role */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#14b8a6]/80" />
                  <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.4em]">Historical Context</h2>
                </div>
                <p className="text-gray-600 leading-[1.8] text-lg font-light italic">
                  &quot;{careerData?.description}&quot;
                </p>
              </motion.section>

              {/* Responsibilities */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-8 h-px bg-[#14b8a6]/80" />
                  <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.4em]">Core Deliverables</h2>
                </div>
                <div className="grid gap-6">
                  {careerData?.requirements?.experience?.map((item, index) => (
                    <div key={index} className="flex items-start gap-6 group hover:translate-x-2 transition-transform duration-500">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#14b8a6]/10 group-hover:border-[#14b8a6]/20 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#14b8a6] transition-colors" />
                      </div>
                      <span className="text-gray-600 leading-relaxed font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Requirements & Extra */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100"
              >
                <div className="grid md:grid-cols-2 gap-16">
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-6 h-px bg-[#14b8a6]/80" />
                      <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.4em]">Prerequisites</h3>
                    </div>
                    <ul className="space-y-4">
                      {careerData?.requirements?.skill?.map((item, index) => (
                        <li key={index} className="flex items-center gap-4 text-sm text-gray-500 font-light">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-6 h-px bg-[#14b8a6]/80" />
                      <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.4em]">Auxiliary Nodes</h3>
                    </div>
                    <ul className="space-y-4">
                      {careerData?.requirements?.extra?.map((item, index) => (
                        <li key={index} className="flex items-center gap-4 text-sm text-gray-500 font-light">
                          <div className="w-1.5 h-1.5 rounded-full border border-[#14b8a6]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Application Form */}
              <motion.section
                id="apply"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Initiate Transmission</h2>
                  <p className="text-sm text-gray-400 font-light max-w-sm mx-auto">
                    Submit your credentials to join our global network of elite architects and innovators.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-20 text-center space-y-8">
                    <div className="w-24 h-24 bg-[#14b8a6]/5 rounded-full flex items-center justify-center mx-auto border border-[#14b8a6]/10">
                      <CheckCircle2 className="w-10 h-10 text-[#14b8a6]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Protocol Successful</h3>
                      <p className="text-gray-500 max-w-sm mx-auto font-light leading-relaxed">
                        Your application has been received. Our selection committee will verify your credentials shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Full Identity</label>
                        <input
                          type="text"
                          name="applicant_name"
                          required
                          value={formData.applicant_name}
                          onChange={handleChange}
                          className={`w-full bg-gray-50/50 border ${errors.applicant_name ? 'border-red-400' : 'border-gray-100'} rounded-2xl py-4 px-6 text-sm focus:bg-white focus:border-[#14b8a6]/40 transition-all outline-none`}
                          placeholder="John Doe"
                        />
                        {errors.applicant_name && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 tracking-widest px-4">{errors.applicant_name}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Digital Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-gray-50/50 border ${errors.email ? 'border-red-400' : 'border-gray-100'} rounded-2xl py-4 px-6 text-sm focus:bg-white focus:border-[#14b8a6]/40 transition-all outline-none`}
                          placeholder="john@protocol.com"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 tracking-widest px-4">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Phone Connection</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-gray-50/50 border ${errors.phone ? 'border-red-400' : 'border-gray-100'} rounded-2xl py-4 px-6 text-sm focus:bg-white focus:border-[#14b8a6]/40 transition-all outline-none`}
                          placeholder="+1 (555) 000-0000"
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 tracking-widest px-4">{errors.phone}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">LinkedIn Nexus</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 text-sm focus:bg-white focus:border-[#14b8a6]/40 transition-all outline-none"
                          placeholder="linkedin.com/in/profile"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Artifact Portfolio</label>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleChange}
                          className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 text-sm focus:bg-white focus:border-[#14b8a6]/40 transition-all outline-none"
                          placeholder="https://portfolio.design"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Credentials (PDF)</label>
                        <input
                          type="file"
                          name="resume"
                          required
                          onChange={handleChange}
                          className={`w-full bg-gray-50/50 border ${errors.resume ? 'border-red-400' : 'border-gray-100'} rounded-2xl py-3.5 px-6 text-sm file:hidden cursor-pointer hover:bg-gray-100/50 transition-colors`}
                        />
                        {errors.resume && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 tracking-widest px-4">{errors.resume}</p>}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Impact Narrative</label>
                      <textarea
                        name="cover_letter"
                        required
                        value={formData.cover_letter}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full bg-gray-50/50 border ${errors.cover_letter ? 'border-red-400' : 'border-gray-100'} rounded-2xl py-4 px-6 text-sm focus:bg-white focus:border-[#14b8a6]/40 transition-all outline-none resize-none`}
                        placeholder="Detail your architectural approach & core intent..."
                      ></textarea>
                      {errors.cover_letter && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 tracking-widest px-4">{errors.cover_letter}</p>}
                    </div>
                    <button
                      type="submit"
                      className="w-full group relative overflow-hidden py-5 px-3 bg-gray-900 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)]"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4 transition-transform group-hover:scale-105 duration-500">
                        Submit Application <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                      <div className="absolute inset-0 bg-[#14b8a6] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </form>
                )}
              </motion.section>
            </div>

            {/* Right Column: Sticky Summary Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-28 space-y-8"
              >
                {/* Protocol Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#14b8a6]/5 rounded-bl-[100%] pointer-events-none" />

                  <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-gray-50">Role Protocol</h3>
                  <div className="space-y-8 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                        <Briefcase className="w-5 h-5 text-[#14b8a6]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Department</p>
                        <p className="text-sm font-bold text-gray-900 tracking-tight">{careerData?.department}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                        <MapPin className="w-5 h-5 text-[#14b8a6]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">location</p>
                        <p className="text-sm font-bold text-gray-900 tracking-tight">{careerData?.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                        <Clock className="w-5 h-5 text-[#14b8a6]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Commitment</p>
                        <p className="text-sm font-bold text-gray-900 tracking-tight">{careerData?.type}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                    Questions regarding this protocol? <br />
                    <a href="mailto:talent@auxinzio.com" className="text-[#14b8a6] font-bold hover:underline">{settings?.email}</a>
                  </p>
                </div>

                {/* Offerings */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100">
                  <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-gray-50">Eco-System</h3>
                  <div className="space-y-6">
                    {careerData?.requirements?.experience?.slice(0, 4).map((_, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#14b8a6]/10 group-hover:border-[#14b8a6]/20 transition-all">
                          <CloudCheck className="w-4 h-4 text-gray-300 group-hover:text-[#14b8a6]" />
                        </div>
                        <span className="text-xs text-gray-500 font-light group-hover:text-gray-900 transition-colors">Strategic Benefits</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

