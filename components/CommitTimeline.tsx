"use client";

import React, { useState } from "react";
import { GitCommit, GitBranch, Code, Calendar, User, Heart, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CommitMilestone } from "@/lib/types";

interface CommitTimelineProps {
  commits: CommitMilestone[];
}

export default function CommitTimeline({ commits }: CommitTimelineProps) {
  const [expandedDiffs, setExpandedDiffs] = useState<Record<string, boolean>>({});

  const toggleDiff = (id: string) => {
    soundManager.playKeyClick();
    setExpandedDiffs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCelebrateCommit = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playLoveChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff2e93", "#8b5cf6", "#38bdf8"],
    });
  };

  const getTagColor = (tag: CommitMilestone["tag"]) => {
    switch (tag) {
      case "feat":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "fix":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "refactor":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "release":
        return "bg-pink-500/10 text-pink-400 border-pink-500/30 animate-pulse";
      case "merge":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
    }
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-4">
            <GitCommit className="w-3.5 h-3.5" />
            <span>GIT LOG --ONELINE --GRAPH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            The Commit History of Us
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every smile, every road trip, and every late-night tea is tracked in our immutable love repository.
            No force pushes allowed.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical git branch line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 -translate-x-1/2 opacity-30 sm:opacity-40" />

          {/* Commits List */}
          <div className="space-y-10 relative">
            {commits.map((commit, idx) => {
              const isEven = idx % 2 === 0;
              const isDiffOpen = !!expandedDiffs[commit.id];

              return (
                <div
                  key={commit.id}
                  className={`flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-6 group`}
                >
                  {/* Content Card */}
                  <div className="w-full sm:w-[calc(50%-2rem)] pl-10 sm:pl-0">
                    <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 relative transition-all duration-300">
                      {/* Top Bar of Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider ${getTagColor(
                              commit.tag
                            )}`}
                          >
                            {commit.tag}
                          </span>
                          <span className="font-mono text-xs text-zinc-400">
                            #{commit.hash}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{commit.date}</span>
                        </div>
                      </div>

                      {/* Commit Subject */}
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                        {commit.message}
                      </h3>

                      {/* Narrative Description */}
                      <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-sans">
                        {commit.description}
                      </p>

                      {/* Author + Branch meta */}
                      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/5 gap-2 text-xs font-mono text-zinc-400">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-pink-400" />
                          <span>Author: <strong className="text-zinc-300">{commit.author}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400/90">
                          <GitBranch className="w-3 h-3" />
                          <span>{commit.branch}</span>
                        </div>
                      </div>

                      {/* Diff Toggle Button */}
                      {commit.diffCode && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => toggleDiff(commit.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-pink-400 hover:text-pink-300 transition-colors"
                            >
                              <Code className="w-3.5 h-3.5" />
                              <span>{isDiffOpen ? "Hide Commit Diff" : "Inspect Code Diff"}</span>
                              {isDiffOpen ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              onClick={handleCelebrateCommit}
                              title="Celebrate this memory"
                              className="p-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 transition-colors"
                            >
                              <Heart className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Diff Code Container */}
                          {isDiffOpen && (
                            <div className="mt-3 p-3.5 rounded-xl bg-[#070512] border border-white/10 font-mono text-xs leading-relaxed overflow-x-auto">
                              <pre className="text-zinc-300">
                                {commit.diffCode.split("\n").map((line, lIdx) => {
                                  if (line.startsWith("+")) {
                                    return (
                                      <div key={lIdx} className="text-emerald-400 bg-emerald-500/10 px-1 rounded">
                                        {line}
                                      </div>
                                    );
                                  }
                                  if (line.startsWith("-")) {
                                    return (
                                      <div key={lIdx} className="text-rose-400 bg-rose-500/10 px-1 rounded">
                                        {line}
                                      </div>
                                    );
                                  }
                                  return <div key={lIdx}>{line}</div>;
                                })}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center Node / Dot on the Branch */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#090716] border-2 border-pink-500 text-pink-400 group-hover:scale-110 group-hover:border-pink-400 shadow-md shadow-pink-500/30 transition-all z-10">
                    <Sparkles className="w-3.5 h-3.5 fill-pink-500/30" />
                  </div>

                  {/* Empty Spacer on desktop */}
                  <div className="hidden sm:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
