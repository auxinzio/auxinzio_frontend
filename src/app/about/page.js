"use client";

import { motion } from "framer-motion";
import { BookOpen, Code, Cpu, Leaf, ShieldCheck, Zap } from "lucide-react";
import Commitments from "@/components/sections/Commitments";
import StatsOrganic2 from "@/components/sections/StatsOrganic2";
import CTASection from "@/components/sections/CTASection";
import Teams from "@/components/sections/Teams";
import {teams} from "@/data/teams.json";
import MissionVision from "@/components/sections/MissionVision";
import AboutSection2 from "@/components/sections/AboutSection2";


export default function About() {

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* Story/Mission Section */}
      <MissionVision/>

      {/* Commitments/Values Section */}
      <Commitments/>

      {/* About Section */}
      <AboutSection2 />

      {/* Stats Section */}
      <StatsOrganic2/>

      {/* CTA Section */}
      <section>
        {/* <CTASection/> */}
      </section>

      {/* Teams Section */}
      <Teams teams={teams}/>
    </div>
  );
}
