"use client";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowLeft, IndianRupee, Home, GraduationCap, Users, CheckCircle2, Send, CloudCheck, } from 'lucide-react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSettings } from "@/app/Context/SettingsContext";

export default function JobDetailsPage() {
  const { slug } = useParams();
  const [careerData, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { settings } = useSettings();
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{careerData?.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: '#14b8a615',
                      color: '#14b8a6',
                    }}
                  >
                    <Briefcase className="w-4 h-4 inline mr-1.5" />
                    {careerData?.team}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {careerData?.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {careerData?.type}
                  </span>
                </div>
              </div>
              <a
                href="#apply"
                className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap inline-block text-center"
                style={{ backgroundColor: '#22c55e', boxShadow: '0 4px 20px #22c55e30' }}
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About the Role */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Role</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{careerData?.description}</p>
              </motion.section>
              {/* Responsibilities */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsibilities</h2>
                <ul className="space-y-3">
                  {careerData?.requirements?.experience?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} />
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
              {/* Requirements */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {careerData?.requirements?.skill?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#06b6d4' }} />
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Nice to Have</h3>
                <ul className="space-y-3">
                  {careerData?.requirements?.extra?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#14b8a6' }} />
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
              {/* Application Form */}
              <motion.section
                id="apply"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for this Position</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we will get back to you within 2 business days.
                </p>
                {isSubmitted ? (
                  <div
                    className="p-8 rounded-2xl text-center"
                    style={{ backgroundColor: '#22c55e10', border: '2px solid #22c55e30' }}
                  >
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#22c55e' }} />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600">
                      Thank you for applying. We will review your application and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="applicant_name"
                          required
                          value={formData.applicant_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
                          style={{ '--tw-ring-color': '#06b6d4' }}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
                          style={{ '--tw-ring-color': '#06b6d4' }}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
                          style={{ '--tw-ring-color': '#06b6d4' }}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
                          style={{ '--tw-ring-color': '#06b6d4' }}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Portfolio / Website
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
                        style={{ '--tw-ring-color': '#06b6d4' }}
                        placeholder="https://johndoe.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Resume *
                      </label>
                      <input
                        type="file"
                        name="resume"
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
                        style={{ '--tw-ring-color': '#06b6d4' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cover Letter *
                      </label>
                      <textarea
                        name="cover_letter"
                        required
                        value={formData.cover_letter}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all resize-none"
                        style={{ '--tw-ring-color': '#06b6d4' }}
                        placeholder="Tell us why you're a great fit for this role..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#22c55e', boxShadow: '0 8px 24px #22c55e30' }}
                    >
                      <Send className="w-5 h-5" />
                      Submit Application
                    </button>
                  </form>
                )}
              </motion.section>
            </div>
            {/* Right Column: Sticky Apply Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-18 space-y-6"
              >
                {/* Quick Apply Card */}
                <div
                  className="rounded-3xl p-8 backdrop-blur-sm border"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%)',
                    borderColor: '#06b6d420',
                    boxShadow: '0 8px 32px rgba(6, 182, 212, 0.1)',
                  }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 mt-0.5" style={{ color: '#14b8a6' }} />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-semibold text-gray-900">{careerData?.department}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#14b8a6' }} />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{careerData?.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 mt-0.5" style={{ color: '#14b8a6' }} />
                      <div>
                        <p className="text-sm text-gray-500">Employment Type</p>
                        <p className="font-semibold text-gray-900">{careerData?.type}</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#apply"
                    className="block w-full py-3 rounded-full font-semibold text-white text-center transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#22c55e' }}
                  >
                    Apply Now
                  </a>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Questions? Contact our talent team at{' '}
                    <a href="mailto:careers@auxinzio.com" className="text-[#06b6d4] hover:underline">
                      careers@auxinzio.com
                    </a>
                  </p>
                </div>
                {/* Benefits */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">What We Offer</h3>
                  <div className="space-y-3">
                    {careerData?.requirements?.experience?.map((item, index) => {
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            <CloudCheck className="w-5 h-5 text-[#22c55e]" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      );
                    })}
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
