"use client";

import React from "react";
import { Heart, GitBranch, ArrowUp, Code2, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";

interface FooterProps {
  profile: CoupleProfile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    soundManager.playKeyClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#070512] py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Heart className="w-5 h-5 fill-pink-500/50 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>{profile.partner1}</span>
                <span className="text-pink-400">❤️</span>
                <span>{profile.partner2}</span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Repository status: Zero merge conflicts, forever in sync.
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
          >
            <span>git checkout HEAD (Top)</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>
              Crafted with Next.js 16, TypeScript &amp; unconditional love.
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400/90">
              <GitBranch className="w-3.5 h-3.5" />
              <span>v2.0.0-LTS</span>
            </span>
            <span>•</span>
            <span className="text-pink-400/90 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Compiled with 0 errors</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
