import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Auxinzio",
    default: "Auxinzio | Expert IT Solutions, Software Development & Digital Transformation",
  },
  description: "Auxinzio delivers enterprise-grade IT solutions — custom software, web & mobile apps, cybersecurity, and digital marketing — engineered to accelerate your business growth and digital transformation.",
  keywords: [
    "IT solutions company",
    "custom software development",
    "web and mobile app development",
    "cybersecurity solutions",
    "IT consulting services",
    "digital transformation services",
    "managed IT services",
    "enterprise software development",
    "cloud solutions",
    "UI UX design",
    "digital marketing agency",
    "Auxinzio",
    "SaaS development",
    "agile software development",
  ],
  metadataBase: new URL("https://auxinz.io"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Auxinzio | Expert IT Solutions & Digital Transformation Partner",
    description: "Transform your business with Auxinzio's expert web, mobile, cloud, and cybersecurity solutions — engineered for sustainable growth.",
    url: "https://auxinz.io",
    siteName: "Auxinzio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auxinzio | Expert IT Solutions & Digital Transformation",
    description: "Custom software, web & mobile apps, cybersecurity, and digital marketing services for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

import SettingProvider from "./Context/SettingsContext";
import AuthProvider from "./Context/AuthContext";
import CookieConsent from "@/components/CookieConsent";
import { ChatBot } from "@/components/ui/ChatBot";
import Loader from "@/components/ui/Loader";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/20 selection:text-primary relative overflow-x-hidden`}
      >
        <Loader />
        <SettingProvider>
          <AuthProvider>
            <MainLayout>
              {children}
            </MainLayout>
            <ChatBot />
            <CookieConsent />
          </AuthProvider>
        </SettingProvider>
      </body>
    </html>
  );
}

