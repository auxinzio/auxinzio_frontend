"use client";

import Commitments from "@/components/sections/Commitments";
import StatsOrganic2 from "@/components/sections/StatsOrganic2";
import Teams from "@/components/sections/Teams";
import MissionVision from "@/components/sections/MissionVision";
import AboutSection2 from "@/components/sections/AboutSection2";
import CTASection from "@/components/sections/CTASection";
import ProgressBar from "@/components/ui/ProgressBar";
import { useSettings } from "../Context/SettingsContext";
import { useEffect, useState } from "react";

export default function About() {

  const [teams, setTeams] = useState("");
  const { settings } = useSettings();


  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/teams/teamsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setTeams(data))
  }, [settings]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Story/Mission Section */}
      <MissionVision />

      {/* Commitments/Values Section */}
      <Commitments />

      {/* About Section */}
      {/* <AboutSection2 /> */}

      {/* Stats Section */}
      <StatsOrganic2 />

      {/* Teams Section */}
      <Teams data={teams.data} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
