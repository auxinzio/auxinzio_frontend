"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowRight } from "lucide-react";
import GetDemoModal from "@/components/sections/GetDemoModal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSettings } from "@/app/Context/SettingsContext";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [settings, setSettings] = useState([]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700 pointer-events-none">
        <div className={cn(
          "mx-auto transition-all duration-700 flex items-center justify-between pointer-events-auto",
          scrolled
            ? "max-w-[1000px] mt-6 px-8 h-16 bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]"
            : "max-w-[1600px] mt-0 px-6 h-24 bg-transparent border-transparent"
        )}>

          {/* Logo Section */}
          <Link href="/" className="relative group">
            <Image
              src="/assets/img/logo.png"
              alt="Auxinz Logo"
              width={120}
              height={60}
              className={cn(
                "transition-all duration-700",
                scrolled ? "h-8" : "h-10"
              )}
            />
            {!scrolled && (
              <motion.div
                layoutId="logo-accent"
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#14b8a6] rounded-full"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative group py-2"
                  >
                    <div className="flex items-start gap-1">
                      {/* <span className={cn(
                        "text-[8px] font-bold tracking-tighter transition-colors duration-500",
                        isActive ? "text-[#14b8a6]" : "text-gray-300 group-hover:text-[#14b8a6]"
                      )}>
                        0{idx + 1}
                      </span> */}
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500",
                        isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
                      )}>
                        {link.name}
                      </span>
                    </div>

                    {/* Architectural Underline */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-[#14b8a6]"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>

            <div className="h-4 w-px bg-gray-100 hidden lg:block" />

            <Button
              variant="gradi"
              size="md"
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl flex items-center gap-3 px-8 group font-bold text-[10px] uppercase tracking-widest"
            >
              Get Demo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-gray-900 hover:text-[#14b8a6] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-[110] border-l border-gray-50 flex flex-col pointer-events-auto"
            >
              <div className="p-8 flex items-center justify-between border-b border-gray-50">
                <Image src="/assets/img/logo.png" alt="Logo" width={120} height={60} className="h-8 w-auto" />
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-full"><X size={20} /></button>
              </div>

              <div className="flex-grow flex flex-col px-8 py-4 gap-6">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between group border-b border-gray-50"
                  >
                    <div className="flex flex-col">
                      {/* <span className="text-[10px] font-bold text-[#14b8a6] tracking-[0.3em] mb-1">0{idx + 1}</span> */}
                      <span className="text-3xl font-light text-gray-900 tracking-tighter group-hover:italic transition-all">{link.name}</span>
                    </div>
                    <ArrowRight className="text-gray-200 group-hover:text-[#14b8a6] transition-colors" />
                  </Link>
                ))}
              </div>

              <div className="p-8">
                <Button variant="gradi" className="w-full py-8 text-lg font-bold rounded-2xl" onClick={() => { setIsOpen(false); setIsModalOpen(true); }}>
                  Request Access
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* The Modal */}
      <GetDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
