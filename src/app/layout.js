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
  title: "Auxinz | Digital Agency",
  description: "Transforming businesses with innovative digital solutions.",
};

import SettingProvider from "./Context/SettingsContext";
import AuthProvider from "./Context/AuthContext";

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
            </AuthProvider>
          </SettingProvider>
      </body>
    </html>
  );
}

