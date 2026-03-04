"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  // Check if pathname starts with /admin
  const isAdmin = pathname && pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
