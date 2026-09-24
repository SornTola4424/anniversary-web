"use client";

import React from "react";
import Image from "next/image";
import {
  Cpu,
  Server,
  Shield,
  Database,
  Heart,
  Zap,
  Sparkles,
} from "lucide-react";
import { CoupleProfile } from "@/lib/types";

interface CoupleStackProps {
  profile: CoupleProfile;
}

export default function CoupleStack({ profile }: CoupleStackProps) {
  return (
    <section id="specs" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>RELATIONSHIP ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Our Tech Stack &amp; Partner Profiles
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Engineered for high resilience, zero latency, and infinite emotional
            bandwidth.
          </p>
        </div>

        {/* Partner Profiler Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Partner 1 (Tola) */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">
                  Dev 01 • Client &amp; Server
                </span>
                <h3 className="text-2xl font-bold text-white font-mono mt-0.5">
                  {profile.partner1}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {profile.partner1Role}
                </p>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-purple-500/40 relative shadow-lg shadow-purple-500/20 shrink-0">
                <Image
                  src="/images/tola_lina_4.jpg"
                  alt={profile.partner1}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Stat Bars */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">Devotion to Lina</span>
                  <span className="text-pink-400 font-bold">
                    100% (Infinite)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">
                    24/7 Emotional Support &amp; Tea
                  </span>
                  <span className="text-cyan-400 font-bold">99.9% Uptime</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 w-[99.9%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">
                    Forehead Kisses Throughput
                  </span>
                  <span className="text-amber-400 font-bold">Max Capacity</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-pink-500 w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">
                    Listening &amp; Comforting Capacity
                  </span>
                  <span className="text-emerald-400 font-bold">
                    High Bandwidth
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[98%]" />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 font-mono text-xs text-zinc-300 space-y-1">
              <p>
                <span className="text-purple-400">const</span> status ={" "}
                <span className="text-emerald-300">
                  &quot;Deeply in love with Lina&quot;
                </span>
                ;
              </p>
              <p>
                <span className="text-purple-400">const</span> mission ={" "}
                <span className="text-yellow-300">
                  &quot;Make her smile every single day&quot;
                </span>
                ;
              </p>
            </div>
          </div>

          {/* Partner 2 (Lina) */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono text-pink-400 uppercase tracking-wider">
                  Dev 02 • Core Happiness Engine
                </span>
                <h3 className="text-2xl font-bold text-white font-mono mt-0.5">
                  {profile.partner2}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {profile.partner2Role}
                </p>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-pink-500/40 relative shadow-lg shadow-pink-500/20 shrink-0">
                <Image
                  src="/images/tola_lina_2.jpg"
                  alt={profile.partner2}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Stat Bars */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">
                    Sweetness &amp; Pure Radiance
                  </span>
                  <span className="text-pink-400 font-bold">
                    100% (Unmatched)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">
                    Patience with Tola&apos;s Geeky Habits
                  </span>
                  <span className="text-purple-400 font-bold">99.9%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[99.9%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">Cutest Laugh Decibels</span>
                  <span className="text-amber-400 font-bold">
                    Music to My Ears
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-pink-500 w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">
                    Superpower: Lighting up any Room
                  </span>
                  <span className="text-cyan-400 font-bold">Omnipresent</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 w-[100%]" />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 font-mono text-xs text-zinc-300 space-y-1">
              <p>
                <span className="text-pink-400">const</span> aura ={" "}
                <span className="text-emerald-300">
                  &quot;Pure sunshine and joy&quot;
                </span>
                ;
              </p>
              <p>
                <span className="text-pink-400">const</span> impact ={" "}
                <span className="text-yellow-300">
                  &quot;Made Tola the happiest person alive&quot;
                </span>
                ;
              </p>
            </div>
          </div>
        </div>

        {/* System Architecture Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-mono text-sm font-semibold text-white">
                Monolithic Love
              </h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No microservices here. Our bond is tightly coupled, atomic, and
              completely indivisible.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-mono text-sm font-semibold text-white">
                Zero Memory Leaks
              </h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every shared giggle, date night, and silly conversation is cached
              in warm persistent storage.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-mono text-sm font-semibold text-white">
                Encrypted With Trust
              </h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Protected by 4096-bit mutual honesty, vulnerability, and steadfast
              loyalty.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-mono text-sm font-semibold text-white">
                Continuous Deployment
              </h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Daily upgrades to our happiness, spontaneous road trips, and
              endless surprise cuddles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
