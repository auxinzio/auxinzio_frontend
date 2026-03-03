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
    default: "Auxinzio | Digital Agency - Transforming Businesses with Visionary Design",
  },
  description: "Transforming businesses with innovative digital solutions. Synthesizing technology with strategic vision and high-end experience design.",
  keywords: ["Digital Agency", "Software Architecture", "Experience Design", "Auxinzio", "Strategic Consulting", "Global Engineering"],
  metadataBase: new URL("https://auxinz.io"),
  openGraph: {
    title: "Auxinzio | Digital Agency",
    description: "Transforming businesses with innovative digital solutions.",
    url: "https://auxinz.io",
    siteName: "Auxinzio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import SettingProvider from "./Context/SettingsContext";
import AuthProvider from "./Context/AuthContext";
import CookieConsent from "@/components/CookieConsent";
import { ChatBot } from "@/components/ui/ChatBot";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/20 selection:text-primary relative overflow-x-hidden`}
      >
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

