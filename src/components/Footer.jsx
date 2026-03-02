"use client";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Facebook, ArrowUpRight, Github } from "lucide-react";
import { useSettings } from "@/app/Context/SettingsContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Footer() {
  const { settings } = useSettings();
  const [service, setService] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/services/servicesList`, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({}) 
    })
      .then(res => res.json())
      .then(data => setService(data))
  }, [settings]);

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/products/productsList`, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({}) 
    })
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [settings]);

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Github, href: "#" },
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden pt-24 pb-12">
      {/* Background Architectural Mark */}
      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.03] select-none">
        <h1 className="text-[30vw] font-black leading-none tracking-tighter">AUXINZ</h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 space-y-12">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/img/logo.png"
                alt="Auxinz Logo"
                width={140}
                height={70}
                className="h-10 w-auto"
              />
            </Link>
            <div className="space-y-6 max-w-md">
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Architecting the future of digital sovereignty. We synchronize high-end technology with strategic vision to empower global enterprises.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <Link 
                    key={idx} 
                    href={social.href} 
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#14b8a6] hover:border-[#14b8a6] hover:text-white transition-all duration-500 group"
                  >
                    <social.icon size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              
              {/* 01 Company */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#14b8a6] tracking-tighter">01</span>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Company</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { name: "About Us", href: "/about" },
                    { name: "Careers", href: "/careers" },
                    { name: "Contact", href: "/contact" },
                    { name: "Trust Hub", href: "#" }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm font-light text-gray-400 hover:text-[#14b8a6] hover:translate-x-1 transition-all flex items-center gap-1 group">
                        {link.name} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 02 Services */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#14b8a6] tracking-tighter">02</span>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Services</h3>
                </div>
                <ul className="space-y-4">
                  {service?.data?.serviceList?.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <Link href={`/services/${item.slug}`} className="text-sm font-light text-gray-400 hover:text-[#14b8a6] hover:translate-x-1 transition-all flex items-center gap-1 group">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 03 Products */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#14b8a6] tracking-tighter">03</span>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Ecosystem</h3>
                </div>
                <ul className="space-y-4">
                  {product?.data?.productsList?.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <Link href={`/products/${item.slug}`} className="text-sm font-light text-gray-400 hover:text-[#14b8a6] hover:translate-x-1 transition-all flex items-center gap-1 group">
                        {item.product_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 04 Legal */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#14b8a6] tracking-tighter">04</span>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Archives</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { name: "Privacy Policy", href: "/privacy-policy" },
                    { name: "Terms of Service", href: "/terms-and-conditions" },
                    { name: "Cookie Policy", href: "#" },
                    { name: "Audit Reports", href: "#" }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm font-light text-gray-400 hover:text-[#14b8a6] hover:translate-x-1 transition-all flex items-center gap-1 group">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.4em]">
            © {new Date().getFullYear()} Auxinzio Digital Ecosystem. All Rights Reserved.
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#14b8a6]" /> Status: Operational</p>
            <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#14b8a6]" /> Version: 4.2.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
