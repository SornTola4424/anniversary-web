"use client";

import React, { useState } from "react";
import { CheckCircle2, Play, Check, ShieldCheck, Terminal, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { DEFAULT_UNIT_TESTS } from "@/lib/defaultData";
import { UnitTestItem } from "@/lib/types";

export default function RelationshipUnitTests() {
  const [tests, setTests] = useState<UnitTestItem[]>(DEFAULT_UNIT_TESTS);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  const runAllTests = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(false);

    // Reset tests to pending
    const reset = tests.map((t) => ({ ...t, status: "pending" as const }));
    setTests(reset);

    for (let i = 0; i < reset.length; i++) {
      // Mark as running
      setTests((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: "running" } : t))
      );
      soundManager.playTone(500 + i * 80, "sine", 0.08, 0.05);

      await new Promise((res) => setTimeout(res, 220));

      // Mark as passed
      setTests((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: "passed" } : t))
      );
    }

    setIsRunning(false);
    setHasRun(true);
    soundManager.playTestSuccess();

    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#ec4899", "#f59e0b"],
    });
  };

  const passedCount = tests.filter((t) => t.status === "passed").length;
  const progressPercent = Math.round((passedCount / tests.length) * 100);

  return (
    <section id="tests" className="scroll-mt-24 py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CONTINUOUS INTEGRATION &amp; TESTING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Relationship Unit Tests
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every core promise and emotional guarantee validated with automated unit tests.
            Zero regression guaranteed.
          </p>
        </div>

        {/* Test Console Window */}
        <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#090615] shadow-2xl shadow-emerald-950/20">
          {/* Header */}
          <div className="bg-[#110d24] px-5 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono text-zinc-400 ml-2">
                jest --verbose relationship.spec.ts
              </span>
            </div>

            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold transition-all disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Running Tests...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Run Test Suite</span>
                </>
              )}
            </button>
          </div>

          {/* Test Coverage Bar */}
          <div className="bg-[#0c081c] px-6 py-3 border-b border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Coverage: 100% Statements â€¢ 100% Love</span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">{progressPercent}% Passed</span>
              <div className="w-32 h-2 rounded-full bg-black/50 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tests List */}
          <div className="p-5 sm:p-6 space-y-3 font-mono text-xs sm:text-sm">
            {tests.map((test) => (
              <div
                key={test.id}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  {test.status === "passed" && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {test.status === "running" && (
                    <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0 mt-0.5" />
                  )}
                  {test.status === "pending" && (
                    <span className="w-4 h-4 rounded-full border border-zinc-600 inline-block shrink-0 mt-0.5" />
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 text-xs">{test.suite} &gt;</span>
                      <span className="text-white font-medium">{test.testName}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 flex flex-wrap gap-x-4">
                      <span>
                        Expected: <strong className="text-emerald-300">{test.expected}</strong>
                      </span>
                      <span>
                        Received: <strong className="text-cyan-300">{test.actual}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 shrink-0 font-mono">
                  {test.durationMs}ms
                </div>
              </div>
            ))}
          </div>

          {/* Test Summary Console Result */}
          {hasRun && (
            <div className="bg-[#05030c] p-5 border-t border-white/10 font-mono text-xs space-y-1.5 text-zinc-300">
              <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                PASS test/relationship.spec.ts (100% Coverage)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-zinc-400 text-[11px]">
                <div>Test Suites: <span className="text-emerald-400 font-bold">1 passed</span>, 1 total</div>
                <div>Tests: <span className="text-emerald-400 font-bold">6 passed</span>, 6 total</div>
                <div>Snapshots: <span className="text-zinc-300">0 total</span></div>
                <div>Time: <span className="text-zinc-300">0.412 s</span></div>
              </div>
              <p className="text-pink-400 pt-1 text-[11px]">
                âœ¨ All unit tests passed! Relationship is production ready for eternity.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
