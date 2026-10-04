"use client";

import React, { useState, useEffect } from "react";
import { GitBranch, Heart, Menu, X, VolumeX, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";

interface NavbarProps {
  profile: CoupleProfile;
}

export default function Navbar({ profile }: NavbarProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#story", label: "01. story" },
    { href: "#timeline", label: "02. git-commits" },
    { href: "#terminal", label: "03. love-cli" },
    { href: "#specs", label: "04. architecture" },
    { href: "#vault", label: "05. gallery" },
    { href: "#tests", label: "06. test-suite" },
    { href: "#contract", label: "07. contract" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

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
        isScrolled || isMenuOpen
          ? "bg-[#0e0409]/95 backdrop-blur-md border-b border-[#0e0409] shadow-sm shadow-pink-200/40 py-1.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
        {/* Brand / Terminal Prompt */}
        <a
          href="#"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2.5 group cursor-pointer min-w-0"
        >
          <div className="relative flex items-center justify-center w-9 h-9 shrink-0 rounded-2xl bg-[#FFDBF1] border border-[#FF8CBF]/60 group-hover:scale-105 shadow-sm transition-transform">
            <Heart className="w-5 h-5 text-[#FF2E93] fill-[#FF2E93]/70 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide text-[#3B1828]">
              <span className="text-[#B81365] truncate">{profile.partner1}</span>
              <span className="text-[#FF2E93] font-mono">&amp;&amp;</span>
              <span className="text-[#B81365] truncate">{profile.partner2}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7C4863]">
              <GitBranch className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="text-emerald-700 font-semibold">main</span>
              <span className="text-pink-300">•</span>
              <span className="text-[#B81365] font-medium truncate">
              </span>
            </div>
          </div>
        </a>

        {/* Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/40 border border-[#FFB8DC] rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono font-medium px-3 py-1 text-[#f9349a] hover:text-[#B81365] hover:bg-[#FFDBF1] rounded-full transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Ambient Music Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? "Pause Lofi Ambiance" : "Play Romantic Lofi Tone"}
            className={`flex items-center gap-2 text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isPlayingMusic
                ? "bg-[#FFDBF1] border-[#FF8CBF] text-[#B81365] font-bold shadow-[0_0_12px_rgba(255,140,191,0.5)]"
                : "bg-[#220b14] border-[#FFB8DC] text-[#cf3986] hover:text-[#3B1828] hover:bg-[#FFDBF1]"
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
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF5C9D] via-[#FF2E93] to-[#BA68C8] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-pink-300/40 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Celebrate</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            title={isMenuOpen ? "Close menu" : "Open menu"}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 rounded-full bg-[#121112] hover:bg-[#FFC9E8] border border-[#FF8CBF]/60 text-[#B81365] shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            {isMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {isMenuOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-[#FFB8DC]/60 bg-[#FFF8FB]/95 backdrop-blur-md shadow-lg shadow-pink-200/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-mono font-medium px-3 py-2.5 text-[#f9349a] hover:text-[#B81365] hover:bg-[#FFDBF1] bg-white/70 border border-[#FFD6EA] rounded-xl transition-colors flex items-center gap-2"
              >
                <GitBranch className="w-3 h-3 text-emerald-600 shrink-0" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
