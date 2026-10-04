"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  Terminal,
  GitPullRequest,
  Copy,
  Check,
  Play,
  Calendar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";

interface HeroProps {
  profile: CoupleProfile;
  onOpenLetter: () => void;
}

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export default function Hero({ profile, onOpenLetter }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "config" | "letter">(
    "code",
  );
  const [uptime, setUptime] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  // Calculate live uptime counter
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(profile.startDate).getTime();
      const now = new Date().getTime();
      const diffMs = Math.max(0, now - start);

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalDays = Math.floor(totalSeconds / 86400);

      // Rough year/month/day calculation
      const years = Math.floor(totalDays / 365.25);
      const remainingDaysAfterYears = totalDays % 365.25;
      const months = Math.floor(remainingDaysAfterYears / 30.4375);
      const days = Math.floor(remainingDaysAfterYears % 30.4375);

      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setUptime({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [profile.startDate]);

  const handleRunCode = () => {
    soundManager.playLoveChime();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff2e93", "#8b5cf6", "#38bdf8", "#fbbf24"],
    });
  };

  const handleCopyCode = () => {
    const codeStr = `// ${profile.partner1} & ${profile.partner2} Love Contract
import { ${profile.partner1}, ${profile.partner2} } from "@/universe";

export const relationship = {
  couple: [${profile.partner1}, ${profile.partner2}],
  since: "${profile.startDate.split("T")[0]}",
  status: "100% Love Coverage, 0 Merge Conflicts",
  uptime: "Forever & Always"
};`;
    navigator.clipboard.writeText(codeStr);
    soundManager.playKeyClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="story"
      className="relative scroll-mt-24 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Status Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-round h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>PRODUCTION STABLE • 99.999% LOVE UPTIME</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>ANNIVERSARY RELEASE: V2.0.0</span>
          </div>
        </div>

        {/* Couple Hero Photo Badge */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative group cursor-pointer" onClick={handleRunCode}>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center gap-3 bg-[#0e0a24]/90 border border-white/20 rounded-full pl-2 pr-5 py-2 shadow-2xl backdrop-blur-xl">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400 shadow-md">
                <Image
                  src="/images/tola_lina_4.jpg"
                  alt={profile.partner1}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="relative flex items-center justify-center -mx-1">
                <Heart className="w-5 h-5 text-pink-400 fill-pink-500 animate-pulse" />
              </div>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-pink-400 shadow-md">
                <Image
                  src="/images/tola_lina_2.jpg"
                  alt={profile.partner2}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="text-left font-mono">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{profile.partner1}</span>
                  <span className="text-pink-400">&amp;</span>
                  <span>{profile.partner2}</span>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>99.999% Love Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Two Devs, One Repository. <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Infinite Loops of Love.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Celebrating the greatest collaboration in history —{" "}
            <span className="text-white font-semibold">{profile.partner1}</span>{" "}
            and{" "}
            <span className="text-white font-semibold">{profile.partner2}</span>
            . Compiled with zero merge conflicts, lifetime warranty, and endless
            hugs.
          </p>
        </div>

        {/* Live Love Uptime Telemetry Dashboard */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl shadow-purple-950/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                    LOVE_SERVER_UPTIME.log
                    <span className="text-[10px] text-zinc-400 font-normal">
                      (Since{" "}
                      {new Date(profile.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      )
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Continuous uninterrupted connection telemetry
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL Encrypted: Destiny v4.0</span>
              </div>
            </div>

            {/* Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                  {uptime.years}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-pink-400">
                  {uptime.years === 1 ? "Year" : "Years"}
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                  {uptime.months}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400">
                  {uptime.months === 1 ? "Month" : "Months"}
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                  {uptime.days}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                  {uptime.days === 1 ? "Day" : "Days"}
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                  {String(uptime.hours).padStart(2, "0")}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                  Hours
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                  {String(uptime.minutes).padStart(2, "0")}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  Mins
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-center relative overflow-hidden group">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-pink-400 mb-1 group-hover:scale-105 transition-transform">
                  {String(uptime.seconds).padStart(2, "0")}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-pink-400 flex items-center justify-center gap-1">
                  Secs{" "}
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-pink-400">●</span>
                <span>
                  Total Days In Love:{" "}
                  <strong className="text-white">
                    {uptime.totalDays} Days
                  </strong>
                </span>
              </div>
              <div>
                Heartbeat Frequency:{" "}
                <span className="text-emerald-400">
                  Synchronized (~140 bpm whenever together)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor Mockup */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0e0b1d] shadow-2xl shadow-purple-950/40">
            {/* Editor Titlebar */}
            <div className="bg-[#151128] px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm shadow-rose-500/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-sm shadow-amber-500/50" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm shadow-emerald-500/50" />
                <span className="text-xs font-mono text-zinc-400 ml-2 hidden sm:inline">
                  VS Love Studio — {profile.partner1} & {profile.partner2}{" "}
                  Workspace
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    activeTab === "code"
                      ? "bg-white/10 text-pink-300 border-b-2 border-pink-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  forever.ts
                </button>
                <button
                  onClick={() => setActiveTab("config")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    activeTab === "config"
                      ? "bg-white/10 text-pink-300 border-b-2 border-pink-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  heartbeat.json
                </button>
                <button
                  onClick={() => setActiveTab("letter")}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    activeTab === "letter"
                      ? "bg-white/10 text-pink-300 border-b-2 border-pink-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  letter.md
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  title="Copy code"
                  className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Editor Code Content */}
            <div className="p-6 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-[#0c0919]">
              {activeTab === "code" && (
                <div className="space-y-1">
                  <p className="text-zinc-500">
                    // Relationship Core Module: Permanent Release
                  </p>
                  <p>
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-yellow-300">
                      {"{ " + profile.partner1 + ", " + profile.partner2 + " }"}
                    </span>{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-emerald-300">
                      &quot;@destiny/universe&quot;
                    </span>
                    ;
                  </p>
                  <p className="h-2" />
                  <p>
                    <span className="text-purple-400">export const</span>{" "}
                    <span className="text-blue-400">ourRelationship</span>:{" "}
                    <span className="text-cyan-300">InfiniteBond</span> = {"{"}
                  </p>
                  <p className="pl-6">
                    <span className="text-zinc-300">developers:</span>{" "}
                    <span className="text-yellow-300">
                      [&quot;{profile.partner1}&quot;, &quot;{profile.partner2}
                      &quot;]
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-zinc-300">anniversaryDate:</span>{" "}
                    <span className="text-emerald-300">
                      &quot;{profile.startDate.split("T")[0]}&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-zinc-300">status:</span>{" "}
                    <span className="text-emerald-300">
                      &quot;100% Love Coverage, 0 Merge Conflicts&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-zinc-300">uptime:</span>{" "}
                    <span className="text-pink-400">
                      &quot;Infinity && Beyond&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-zinc-300">cuddleThroughput:</span>{" "}
                    <span className="text-pink-400">Infinity</span>,
                  </p>
                  <p className="pl-6">
                    <span className="text-blue-300">executeDailyRoutine</span>:{" "}
                    <span className="text-purple-400">async</span> () =&gt;{" "}
                    {"{"}
                  </p>
                  <p className="pl-12 text-zinc-300">
                    <span className="text-purple-400">await</span>{" "}
                    <span className="text-blue-300">sendGoodMorningKiss</span>
                    ();
                  </p>
                  <p className="pl-12 text-zinc-300">
                    <span className="text-purple-400">await</span>{" "}
                    <span className="text-blue-300">
                      shareLaughterAndSnacks
                    </span>
                    ();
                  </p>
                  <p className="pl-12 text-zinc-300">
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-emerald-300">
                      &quot;Falling in love all over again ❤️&quot;
                    </span>
                    ;
                  </p>
                  <p className="pl-6">{"}"},</p>
                  <p>{"};"}</p>
                </div>
              )}

              {activeTab === "config" && (
                <div className="space-y-1 text-zinc-300">
                  <p>{"{"}</p>
                  <p className="pl-6">
                    <span className="text-blue-400">
                      &quot;connection&quot;
                    </span>
                    :{" "}
                    <span className="text-emerald-300">
                      &quot;unbreakable&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-blue-400">&quot;partnerA&quot;</span>:{" "}
                    <span className="text-emerald-300">
                      &quot;{profile.partner1}&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-blue-400">&quot;partnerB&quot;</span>:{" "}
                    <span className="text-emerald-300">
                      &quot;{profile.partner2}&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-blue-400">
                      &quot;cachePolicy&quot;
                    </span>
                    :{" "}
                    <span className="text-emerald-300">
                      &quot;every_sweet_memory_saved_forever&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-6">
                    <span className="text-blue-400">
                      &quot;autoRetryHugsOnBadDay&quot;
                    </span>
                    : <span className="text-purple-400">true</span>,
                  </p>
                  <p className="pl-6">
                    <span className="text-blue-400">&quot;warranty&quot;</span>:{" "}
                    <span className="text-pink-400">
                      &quot;Lifetime + Eternity&quot;
                    </span>
                  </p>
                  <p>{"}"}</p>
                </div>
              )}

              {activeTab === "letter" && (
                <div className="space-y-2 text-zinc-300 font-sans leading-relaxed">
                  <p className="font-mono text-xs text-pink-400">
                    # {profile.loveLetterTitle}
                  </p>
                  <p className="text-sm italic text-zinc-300">
                    &quot;From the moment we met, every day with you has been my
                    favorite commit in this journey of life...&quot;
                  </p>
                  <button
                    onClick={onOpenLetter}
                    className="mt-2 text-xs font-mono text-pink-400 hover:text-pink-300 underline flex items-center gap-1"
                  >
                    Click to expand full handwritten love letter →
                  </button>
                </div>
              )}
            </div>

            {/* Run Button Footer */}
            <div className="bg-[#120e26] px-6 py-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-emerald-400">✓</span>
                <span>Compiled with TypeScript 5 • 0 errors • 0 warnings</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleRunCode}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-mono text-xs font-semibold shadow-lg shadow-pink-500/25 active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Execute Love Routine</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#timeline"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs font-semibold backdrop-blur-md transition-all hover:scale-105"
          >
            <GitPullRequest className="w-4 h-4 text-pink-400" />
            <span>View Git Commits</span>
          </a>

          <a
            href="#terminal"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 font-mono text-xs font-semibold backdrop-blur-md transition-all hover:scale-105"
          >
            <Terminal className="w-4 h-4 text-purple-300" />
            <span>Launch Love CLI</span>
          </a>

          <button
            onClick={onOpenLetter}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-mono text-xs font-semibold shadow-lg shadow-pink-500/30 transition-all hover:scale-105"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Read Love Letter</span>
          </button>
        </div>
      </div>
    </section>
  );
}
