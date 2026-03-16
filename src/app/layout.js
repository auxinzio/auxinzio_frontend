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
    default: "Auxinzio | Software Development & IT Solutions",
  },
  description: "Auxinzio delivers reliable IT solutions — custom software development, web & mobile apps, and strategic IT consulting designed to grow your business.",
  keywords: [
    "IT solutions",
    "software development company",
    "web development",
    "mobile app development",
    "IT consulting",
    "digital transformation",
    "managed IT services",
    "custom software",
    "Auxinzio",
  ],
  metadataBase: new URL("https://auxinz.io"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Auxinzio | Software Development & IT Solutions Partner",
    description: "Build reliable digital solutions with Auxinzio. We provide expert software development, IT consulting, and support services for your business.",
    url: "https://auxinz.io",
    siteName: "Auxinzio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auxinzio | Software Development & IT Solutions",
    description: "Reliable software development, IT consulting, and support services for modern businesses.",
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

