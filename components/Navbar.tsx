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
      colors: ["#ff2e93", "#8b5cf6", "#ec4899", "#38bdf8", "#fbbf24"],
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090716]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-purple-950/20 py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Terminal Prompt */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/30 border border-pink-500/30 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-500/60 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
              <span>{profile.partner1}</span>
              <span className="text-pink-400 font-mono">&&</span>
              <span>{profile.partner2}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
              <GitBranch className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">main</span>
              <span className="text-zinc-600">•</span>
              <span className="text-pink-300/80">v2.0-anniversary</span>
            </div>
          </div>
        </a>

        {/* Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          <a
            href="#story"
            className="text-xs font-mono px-3 py-1 text-zinc-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition-colors"
          >
            01. story
          </a>
          <a
            href="#timeline"
            className="text-xs font-mono px-3 py-1 text-zinc-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition-colors"
          >
            02. git-commits
          </a>
          <a
            href="#terminal"
            className="text-xs font-mono px-3 py-1 text-zinc-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition-colors"
          >
            03. love-cli
          </a>
          <a
            href="#specs"
            className="text-xs font-mono px-3 py-1 text-zinc-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition-colors"
          >
            04. architecture
          </a>
          <a
            href="#vault"
            className="text-xs font-mono px-3 py-1 text-zinc-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition-colors"
          >
            05. gallery
          </a>
          <a
            href="#tests"
            className="text-xs font-mono px-3 py-1 text-zinc-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition-colors"
          >
            06. test-suite
          </a>
          <a
            href="#contract"
            className="text-xs font-mono px-3 py-1 text-zinc-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition-colors"
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
            className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
              isPlayingMusic
                ? "bg-pink-500/20 border-pink-500/50 text-pink-300 shadow-[0_0_12px_rgba(255,46,147,0.3)]"
                : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {isPlayingMusic ? (
              <>
                <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                  <span className="w-0.5 bg-pink-400 rounded animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "60%" }} />
                  <span className="w-0.5 bg-pink-400 rounded animate-[bounce_0.8s_ease-in-out_infinite_0.2s]" style={{ height: "100%" }} />
                  <span className="w-0.5 bg-pink-400 rounded animate-[bounce_0.5s_ease-in-out_infinite_0.4s]" style={{ height: "40%" }} />
                </div>
                <span className="hidden sm:inline">Lofi Love</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Music: Off</span>
              </>
            )}
          </button>

          {/* Quick Confetti Burst */}
          <button
            onClick={handleCelebrate}
            title="Send Heart Fireworks"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-semibold shadow-md shadow-pink-500/25 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Celebrate</span>
          </button>

          {/* Settings / Customize */}
          <button
            onClick={onOpenSettings}
            title="Customize Names & Date"
            aria-label="Settings"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
