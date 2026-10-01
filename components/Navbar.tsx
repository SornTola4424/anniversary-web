"use client";

import React, { useState, useEffect } from "react";
import { GitBranch, Heart, Music, VolumeX, Sparkles, Settings } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";

interface NavbarProps {
  profile: CoupleProfile;
  onOpenSettings: () => void;
}

export default function Navbar({ profile, onOpenSettings }: NavbarProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMusic = () => {
    const nextState = soundManager.toggleAmbientMusic((state) => {
      setIsPlayingMusic(state);
    });
    setIsPlayingMusic(nextState);
  };

  const handleCelebrate = () => {
    soundManager.playLoveChime();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.15 },
      colors: ["#FF5C9D", "#BA68C8", "#FFDBF1", "#38bdf8", "#fbbf24"],
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF0F7]/95 backdrop-blur-md border-b border-[#FFB8DC] shadow-sm shadow-pink-200/40 py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Terminal Prompt */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-[#FFDBF1] border border-[#FF8CBF]/60 group-hover:scale-105 shadow-sm transition-transform">
            <Heart className="w-5 h-5 text-[#FF2E93] fill-[#FF2E93]/70 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide text-[#3B1828]">
              <span>{profile.partner1}</span>
              <span className="text-[#FF2E93] font-mono">&amp;&amp;</span>
              <span>{profile.partner2}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7C4863]">
              <GitBranch className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">main</span>
              <span className="text-pink-300">•</span>
              <span className="text-[#B81365] font-medium">v2.0-anniversary</span>
            </div>
          </div>
        </a>

        {/* Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/70 border border-[#FFB8DC] rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm">
          <a
            href="#story"
            className="text-xs font-mono font-medium px-3 py-1 text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
          >
            01. story
          </a>
          <a
            href="#timeline"
            className="text-xs font-mono font-medium px-3 py-1 text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
          >
            02. git-commits
          </a>
          <a
            href="#terminal"
            className="text-xs font-mono font-medium px-3 py-1 text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
          >
            03. love-cli
          </a>
          <a
            href="#specs"
            className="text-xs font-mono font-medium px-3 py-1 text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
          >
            04. architecture
          </a>
          <a
            href="#vault"
            className="text-xs font-mono font-medium px-3 py-1 text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
          >
            05. gallery
          </a>
          <a
            href="#tests"
            className="text-xs font-mono font-medium px-3 py-1 text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
          >
            06. test-suite
          </a>
          <a
            href="#contract"
            className="text-xs font-mono font-medium px-3 py-1 text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
          >
            07. contract
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Ambient Music Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? "Pause Lofi Ambiance" : "Play Romantic Lofi Tone"}
            className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isPlayingMusic
                ? "bg-[#FFDBF1] border-[#FF8CBF] text-[#B81365] font-bold shadow-[0_0_12px_rgba(255,140,191,0.5)]"
                : "bg-white/80 border-[#FFB8DC] text-[#7C4863] hover:text-[#3B1828] hover:bg-[#FFDBF1]"
            }`}
          >
            {isPlayingMusic ? (
              <>
                <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                  <span className="w-0.5 bg-[#FF2E93] rounded animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "60%" }} />
                  <span className="w-0.5 bg-[#FF2E93] rounded animate-[bounce_0.8s_ease-in-out_infinite_0.2s]" style={{ height: "100%" }} />
                  <span className="w-0.5 bg-[#FF2E93] rounded animate-[bounce_0.5s_ease-in-out_infinite_0.4s]" style={{ height: "40%" }} />
                </div>
                <span className="hidden sm:inline">Lofi Love</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#7C4863]" />
                <span className="hidden sm:inline">Music: Off</span>
              </>
            )}
          </button>

          {/* Quick Confetti Burst */}
          <button
            onClick={handleCelebrate}
            title="Send Heart Fireworks"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF5C9D] via-[#FF2E93] to-[#BA68C8] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-pink-300/40 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Celebrate</span>
          </button>

          {/* Settings / Customize */}
          <button
            onClick={onOpenSettings}
            title="Settings & Edit Couple Profile"
            aria-label="Settings"
            className="p-2 rounded-full bg-[#FFDBF1] hover:bg-[#FFC9E8] border border-[#FF8CBF]/60 text-[#7C4863] hover:text-[#3B1828] shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#B81365]" />
          </button>
        </div>
      </div>
    </header>
  );
}
