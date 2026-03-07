"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  Box,
  Calendar,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useSettings } from '@/app/Context/SettingsContext';
import Image from "next/image";

export default function GetDemoModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const { settings } = useSettings();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/products/productsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setProduct(data?.data?.productsList))
  }, [settings]);


  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    objective: "",
    product_id: "",
  });
  const handleClose = useCallback(() => {
    onClose();
    // Delay resetting states slightly to prevent flicker during exit animation
    setTimeout(() => {
      setSuccess(false);
      setError(false);
      setMessage("");
    }, 500);
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^(?=[^@]*[a-zA-Z])[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    const phoneRegex = /^[6-9]\d{9,14}$/;

    if (!formData.name || formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters.';
    if (!formData.company || formData.company.length < 2) newErrors.company = 'Company must be at least 2 characters.';

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

    if (!formData.product_id) newErrors.product_id = 'Please select a product.';
    if (!formData.objective || formData.objective.length < 5) newErrors.objective = 'Please provide an objective.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);
    setError(false);

    if (!settings?.backend_api_url) {
      setError(true);
      setMessage("API configuration missing.");
      setLoading(false);
      return;
    }

    fetch(`${settings.backend_api_url}/api/enquiry/submit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setSuccess(true);
          setMessage(data.message || "Request successfully dispatched.");
          setFormData({
            company: "",
            name: "",
            email: "",
            phone: "",
            objective: "",
            product_id: "",
          });
          setErrors({});

          // Close modal after 5 seconds
          setTimeout(() => {
            handleClose();
          }, 5000);
        } else {
          setError(true);
          setMessage(data.message || "Synchronization failed. Please try again.");
          // Clear form fields as requested on failure
          setFormData({
            company: "",
            name: "",
            email: "",
            phone: "",
            objective: "",
            product_id: "",
          });
        }
      })
      .catch((err) => {
        setError(true);
        setMessage("Connection failed. Protocol interrupted.");
        setFormData({
          company: "",
          name: "",
          email: "",
          phone: "",
          objective: "",
          product_id: "",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:p-12">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- LEFT: ARCHITECTURAL BRANDING --- */}
            <div className="lg:w-5/12 bg-gray-900 relative overflow-hidden p-10 lg:p-14 flex flex-col justify-between text-white shrink-0">
              {/* Background Large Text (Watermark) */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none origin-left -rotate-90 hidden lg:block">
                <h1 className="text-[20vw] font-black tracking-tighter leading-none uppercase">Auxinz</h1>
              </div>

              {/* Decorative SVG Grid */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

              <div className="relative z-10">
                <div className="flex items-center md:gap-4 gap-2 md:mb-8 mb-3">
                  <div className="w-100 h-20 rounded-xl p-2 flex items-center justify-center">
                    <Image src="/assets/img/logo.png" alt="Logo" width={150} height={50} />
                  </div>
                </div>

                <h2 className="text-3xl lg:text-6xl font-light tracking-tighter leading-[0.95] hd:mb-8">
                  Request <br />
                  <span className="italic font-normal text-[#14b8a6]">Synchronization.</span>
                </h2>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-10 max-w-xs hidden lg:block">
                  Secure your slot in our quarterly engineering cycle. We prioritize projects based on infrastructural complexity and vision alignment.
                </p>

                <div className="space-y-4 hidden lg:block">
                  {[
                    { icon: ShieldCheck, text: "Zero-Trust Infrastructure" },
                    { icon: Globe, text: "Global Scale Deployment" },
                    { icon: Activity, text: "Real-time Analytics Sync" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                      <item.icon size={14} className="text-[#14b8a6]" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT: THE INTERFACE (FORM) --- */}
            <div className="lg:w-7/12 bg-white p-8 lg:p-14 relative overflow-y-auto custom-scrollbar">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all group z-20"
              >
                <X size={20} className="text-gray-400 group-hover:text-gray-900" />
              </button>

              <div className="h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#14b8a6]/10 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-10 h-10 text-[#14b8a6]" />
                      </div>
                      <h3 className="text-3xl font-light text-gray-900 tracking-tight">
                        Protocol <span className="italic font-normal text-[#14b8a6]">Synthesized.</span>
                      </h3>
                      <p className="text-gray-500 max-w-sm text-sm font-light leading-relaxed">
                        {message || "One of our specialists will reach out to your provided coordinates within 24 hours."}
                      </p>
                      <div className="pt-4">
                        <div className="h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="h-full bg-[#14b8a6]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4"
                        >
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <AlertCircle size={16} className="text-red-600" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-none mb-1">Transmission Error</p>
                            <p className="text-xs text-red-500 font-light">{message}</p>
                          </div>
                        </motion.div>
                      )}

                      <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        {/* Section 01: Identification */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-[#14b8a6] w-5 h-5 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">1</span>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Identification</h3>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                            <div className={cn("relative group border-b transition-all pb-1", errors.name ? "border-red-400" : "border-gray-100 focus-within:border-[#14b8a6]")}>
                              <input
                                type="text"
                                required
                                placeholder="Your Name"
                                className="w-full bg-transparent py-3 outline-none placeholder:text-gray-300 font-light text-lg pr-6"
                                value={formData.name}
                                onChange={(e) => {
                                  setFormData({ ...formData, name: e.target.value });
                                  if (errors.name) setErrors({ ...errors, name: null });
                                }}
                              />
                              <User className={cn("absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", errors.name ? "text-red-400" : "text-gray-200 group-focus-within:text-[#14b8a6]")} />
                              {errors.name && <p className="text-[8px] text-red-500 font-bold uppercase mt-1 tracking-widest absolute -bottom-5 left-0">{errors.name}</p>}
                            </div>
                            <div className={cn("relative group border-b transition-all pb-1", errors.company ? "border-red-400" : "border-gray-100 focus-within:border-[#14b8a6]")}>
                              <input
                                type="text"
                                required
                                placeholder="Organization Name"
                                className="w-full bg-transparent py-3 outline-none placeholder:text-gray-300 font-light text-lg pr-6"
                                value={formData.company}
                                onChange={(e) => {
                                  setFormData({ ...formData, company: e.target.value });
                                  if (errors.company) setErrors({ ...errors, company: null });
                                }}
                              />
                              <Box className={cn("absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", errors.company ? "text-red-400" : "text-gray-200 group-focus-within:text-[#14b8a6]")} />
                              {errors.company && <p className="text-[8px] text-red-500 font-bold uppercase mt-1 tracking-widest absolute -bottom-5 left-0">{errors.company}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Section 02: Communication */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-[#14b8a6] w-5 h-5 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">2</span>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Communication</h3>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                            <div className={cn("relative group border-b transition-all pb-1", errors.email ? "border-red-400" : "border-gray-100 focus-within:border-[#14b8a6]")}>
                              <input
                                type="email"
                                required
                                placeholder="Protocol Mail"
                                className="w-full bg-transparent py-3 outline-none placeholder:text-gray-300 font-light text-lg pr-6"
                                value={formData.email}
                                onChange={(e) => {
                                  setFormData({ ...formData, email: e.target.value.replace(/[^a-zA-Z0-9.@]/g, '') });
                                  if (errors.email) setErrors({ ...errors, email: null });
                                }}
                              />
                              <Mail className={cn("absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", errors.email ? "text-red-400" : "text-gray-200 group-focus-within:text-[#14b8a6]")} />
                              {errors.email && <p className="text-[8px] text-red-500 font-bold uppercase mt-1 tracking-widest absolute -bottom-5 left-0">{errors.email}</p>}
                            </div>
                            <div className={cn("relative group border-b transition-all pb-1", errors.phone ? "border-red-400" : "border-gray-100 focus-within:border-[#14b8a6]")}>
                              <input
                                type="text"
                                required
                                placeholder="Mobile Link"
                                inputMode="numeric"
                                maxLength={10}
                                pattern="[0-9]*"
                                className="w-full bg-transparent py-3 outline-none placeholder:text-gray-300 font-light text-lg pr-6"
                                value={formData.phone}
                                onChange={(e) => {
                                  setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
                                  if (errors.phone) setErrors({ ...errors, phone: null });
                                }}
                              />
                              <Phone className={cn("absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", errors.phone ? "text-red-400" : "text-gray-200 group-focus-within:text-[#14b8a6]")} />
                              {errors.phone && <p className="text-[8px] text-red-500 font-bold uppercase mt-1 tracking-widest absolute -bottom-5 left-0">{errors.phone}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Section 03: Ecosystem */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-[#14b8a6] w-5 h-5 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">3</span>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Ecosystem Selection</h3>
                          </div>
                          <div className={cn("relative group border-b transition-all pb-1", errors.product_id ? "border-red-400" : "border-gray-100 focus-within:border-[#14b8a6]")}>
                            <select
                              required
                              className="w-full bg-transparent py-3 outline-none font-light text-lg appearance-none cursor-pointer"
                              value={formData.product_id}
                              onChange={(e) => {
                                setFormData({ ...formData, product_id: e.target.value });
                                if (errors.product_id) setErrors({ ...errors, product_id: null });
                              }}
                            >
                              <option value="" className="text-gray-400">Select Product</option>
                              {product.map((p) => (
                                <option key={p.id} value={p.id} className="text-gray-900">
                                  {p.product_name}
                                </option>
                              ))}
                            </select>
                            <ArrowRight size={16} className={cn("absolute right-0 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none transition-colors", errors.product_id ? "text-red-400" : "text-gray-200 group-focus-within:text-[#14b8a6]")} />
                            {errors.product_id && <p className="text-[8px] text-red-500 font-bold uppercase mt-1 tracking-widest absolute -bottom-5 left-0">{errors.product_id}</p>}
                          </div>
                        </div>

                        {/* Section 04: Objective */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-[#14b8a6] w-5 h-5 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">4</span>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Objective</h3>
                          </div>

                          <div className={cn("relative group border-b transition-all pb-1", errors.objective ? "border-red-400" : "border-gray-100 focus-within:border-[#14b8a6]")}>
                            <textarea
                              placeholder="Project brief or specific requirements..."
                              rows={2}
                              className="w-full bg-transparent py-3 outline-none placeholder:text-gray-300 font-light text-lg resize-none pr-6"
                              value={formData.objective}
                              onChange={(e) => {
                                setFormData({ ...formData, objective: e.target.value });
                                if (errors.objective) setErrors({ ...errors, objective: null });
                              }}
                            />
                            <MessageSquare className={cn("absolute right-0 top-4 w-4 h-4 transition-colors", errors.objective ? "text-red-400" : "text-gray-200 group-focus-within:text-[#14b8a6]")} />
                            {errors.objective && <p className="text-[8px] text-red-500 font-bold uppercase mt-1 tracking-widest absolute -bottom-5 left-0">{errors.objective}</p>}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-8">
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] max-w-[200px] text-center sm:text-left leading-relaxed">
                            By initiating, you authorize data synchronization.
                          </p>

                          <Button
                            variant="gradi"
                            disabled={loading}
                            type="submit"
                            className="w-full sm:w-auto rounded-2xl px-10 py-6 text-xs font-bold shadow-2xl shadow-[#14b8a6]/20 flex items-center justify-center gap-4 hover:scale-[1.05] transition-all active:scale-95 group disabled:opacity-50"
                          >
                            {loading ? 'Processing...' : 'Initiate Synchronization'}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
