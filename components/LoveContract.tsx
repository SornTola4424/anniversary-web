"use client";

import React, { useState } from "react";
import {
  GitPullRequest,
  GitMerge,
  Check,
  Heart,
  ShieldCheck,
  Printer,
  Sparkles,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";

interface LoveContractProps {
  profile: CoupleProfile;
}

export default function LoveContract({ profile }: LoveContractProps) {
  const [isSigned, setIsSigned] = useState(false);
  const [signDate, setSignDate] = useState<string>("");

  const handleSign = () => {
    soundManager.playLoveChime();
    setIsSigned(true);
    setSignDate(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981"],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="contract" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>PULL REQUEST #2024: ETERNAL BOND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            The Love Agreement &amp; Certificate
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A permanent digital covenant between {profile.partner1} &amp;{" "}
            {profile.partner2}, approved by the universe.
          </p>
        </div>

        {/* PR Card */}
        <div className="glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl shadow-purple-950/40 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400" />

          {/* GitHub PR Header */}
          <div className="bg-[#120e26] p-6 border-b border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600 text-white font-mono text-xs font-bold shadow-md shadow-purple-600/30">
                  <GitMerge className="w-3.5 h-3.5" />
                  <span>Merged</span>
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {profile.partner2.toLowerCase()}/heart:forever into{" "}
                  {profile.partner1.toLowerCase()}/heart:main
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>All checks passed (4/4)</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Merge Pull Request: Unconditional Devotion, Daily Laughs &amp;
              Everlasting Love
            </h3>

            {/* Reviewers List */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5 text-xs font-mono text-zinc-400">
              <span className="text-zinc-500">Reviewers:</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3.5 h-3.5" /> Destiny
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3.5 h-3.5" /> The Universe
              </span>
              <span className="flex items-center gap-1 text-pink-400">
                <Check className="w-3.5 h-3.5" /> {profile.partner1}
              </span>
              <span className="flex items-center gap-1 text-pink-400">
                <Check className="w-3.5 h-3.5" /> {profile.partner2}
              </span>
            </div>
          </div>

          {/* Vow Clauses */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-pink-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Covenant Terms &amp; Conditions
              </h4>

              <div className="space-y-3.5">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <span className="text-pink-400 font-mono text-xs font-bold pt-0.5">
                    § 1.0
                  </span>
                  <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                    <strong>Zero Downtime Comfort:</strong> In moments of stress
                    or doubt, both parties agree to deploy warm hugs, listening
                    ears, and comforting beverages with immediate priority.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <span className="text-purple-400 font-mono text-xs font-bold pt-0.5">
                    § 2.0
                  </span>
                  <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                    <strong>The Dessert Invariant:</strong> The last bite of
                    dessert, french fry, or slice of pizza is by universal law
                    reserved for {profile.partner2}, unless explicitly
                    delegated.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <span className="text-cyan-400 font-mono text-xs font-bold pt-0.5">
                    § 3.0
                  </span>
                  <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                    <strong>Immutable Admiration:</strong> {profile.partner1}{" "}
                    promises to remain {profile.partner2}&apos;s biggest
                    admirer, celebrating every triumph, supporting every dream,
                    and cherishing her smile forever.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-xs font-bold pt-0.5">
                    § 4.0
                  </span>
                  <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                    <strong>Automatic Grace Protocol:</strong> No arguments
                    shall persist across midnight. Every disagreement is treated
                    as a collaborative debugging session where the goal is
                    understanding, not winning.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-pink-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Cryptographic Seal
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    {isSigned
                      ? "STATUS: SEALED & RATIFIED ❤️"
                      : "STATUS: PENDING RATIFICATION"}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {isSigned
                      ? `Signed on ${signDate}`
                      : "Click button to sign with heart"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!isSigned ? (
                  <button
                    onClick={handleSign}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-mono text-xs font-bold shadow-lg shadow-pink-500/30 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Sign Contract With Heart</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-mono text-xs transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Certificate</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
