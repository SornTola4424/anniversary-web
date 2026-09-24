"use client";

import React, { useState, useEffect } from "react";
import LoveBackground from "@/components/LoveBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CommitTimeline from "@/components/CommitTimeline";
import LoveTerminal from "@/components/LoveTerminal";
import CoupleStack from "@/components/CoupleStack";
import PhotoVault from "@/components/PhotoVault";
import RelationshipUnitTests from "@/components/RelationshipUnitTests";
import LoveContract from "@/components/LoveContract";
import LoveLetterModal from "@/components/LoveLetterModal";
import SettingsModal from "@/components/SettingsModal";
import Footer from "@/components/Footer";

import {
  DEFAULT_COUPLE_PROFILE,
  DEFAULT_COMMITS,
  DEFAULT_PHOTOS,
} from "@/lib/defaultData";
import { CoupleProfile } from "@/lib/types";

const STORAGE_KEY = "coder_couple_profile_v3_tola_lina";

export default function Home() {
  const [profile, setProfile] = useState<CoupleProfile>(DEFAULT_COUPLE_PROFILE);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Load saved profile if available, ensuring Lina is updated
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.partner2 === "Sneha") {
          parsed.partner2 = "Lina";
        }
        setProfile(parsed);
      } else {
        setProfile(DEFAULT_COUPLE_PROFILE);
      }
    } catch {
      // Local storage unavailable or failed
    }
  }, []);

  const handleSaveProfile = (newProfile: CoupleProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch {
      // ignore storage error
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090716] text-[#f3f4f6] selection:bg-pink-500 selection:text-white">
      {/* Background Interactive Particles & Neon Glows */}
      <LoveBackground />

      {/* Navigation */}
      <Navbar
        profile={profile}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          profile={profile}
          onOpenLetter={() => setIsLetterModalOpen(true)}
        />

        <CommitTimeline commits={DEFAULT_COMMITS} />

        <LoveTerminal profile={profile} />

        <CoupleStack profile={profile} />

        <PhotoVault photos={DEFAULT_PHOTOS} />

        <RelationshipUnitTests />

        <LoveContract profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Modals */}
      <LoveLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        profile={profile}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentProfile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
