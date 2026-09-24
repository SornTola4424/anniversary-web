"use client";

import React, { useState } from "react";
import { X, Heart, Copy, Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CoupleProfile;
}

export default function LoveLetterModal({ isOpen, onClose, profile }: LoveLetterModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    soundManager.playKeyClick();
    navigator.clipboard.writeText(profile.loveLetterBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendHug = () => {
    soundManager.playLoveChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#ff2e93", "#8b5cf6", "#ec4899", "#fbbf24"],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#120d26] border border-pink-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl shadow-pink-950/50 relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
            <Heart className="w-4 h-4 fill-pink-500" />
            <span>ENCRYPTED LOVE LETTER • TOP SECRET</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Copy Letter"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Letterhead Title */}
        <div className="mb-6">
          <span className="text-xs font-mono text-purple-400">From: {profile.partner1} &lt;heart@main&gt;</span>
          <br />
          <span className="text-xs font-mono text-pink-400">To: {profile.partner2} &lt;forever@destiny&gt;</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            {profile.loveLetterTitle}
          </h2>
        </div>

        {/* Letter Body */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans mb-6">
          {profile.loveLetterBody}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Status: Stored in permanent heartbeat memory</span>
          </div>

          <button
            onClick={handleSendHug}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-mono text-xs font-semibold shadow-lg shadow-pink-500/25 active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Send Hug Back ❤️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
