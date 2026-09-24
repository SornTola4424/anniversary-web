"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, Sparkles, CornerDownLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";

interface LoveTerminalProps {
  profile: CoupleProfile;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function LoveTerminal({ profile }: LoveTerminalProps) {
  const p1 = profile.partner1.toLowerCase();
  const p2 = profile.partner2.toLowerCase();

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-pink-400 font-semibold">
            ✨ Welcome to the {profile.partner1} &amp; {profile.partner2} Love
            Terminal (v2.0.0-LTS)
          </p>
          <p className="text-zinc-400">
            Type <span className="text-cyan-400">help</span> or click any quick
            command chip below to explore.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    soundManager.playKeyClick();

    let output: React.ReactNode = null;

    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (trimmed === "help") {
      output = (
        <div className="space-y-1.5 text-zinc-300">
          <p className="text-yellow-300 font-bold">Available Commands:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-cyan-400 font-bold">
                cat love-letter.txt
              </span>{" "}
              - Read personal letter
            </div>
            <div>
              <span className="text-cyan-400 font-bold">npm run hug</span> -
              Send instant warm hugs
            </div>
            <div>
              <span className="text-cyan-400 font-bold">sudo marry {p2}</span> -
              Check marriage privileges
            </div>
            <div>
              <span className="text-cyan-400 font-bold">curl api/heart</span> -
              Fetch current feelings
            </div>
            <div>
              <span className="text-cyan-400 font-bold">git status</span> -
              Check relationship state
            </div>
            <div>
              <span className="text-cyan-400 font-bold">heart</span> - Display
              ASCII Love Art
            </div>
            <div>
              <span className="text-cyan-400 font-bold">clear</span> - Clear the
              terminal
            </div>
          </div>
        </div>
      );
    } else if (
      trimmed === "cat love-letter.txt" ||
      trimmed === "cat letter" ||
      trimmed === "cat letter.md"
    ) {
      output = (
        <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-200 space-y-2">
          <p className="font-bold text-pink-300">
            💌 {profile.loveLetterTitle}
          </p>
          <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed font-sans text-zinc-200">
            {profile.loveLetterBody}
          </p>
        </div>
      );
    } else if (trimmed === "npm run hug" || trimmed === "hug") {
      soundManager.playLoveChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff2e93", "#8b5cf6", "#ec4899", "#fbbf24"],
      });
      output = (
        <div className="text-pink-400 space-y-1">
          <p className="font-bold">
            ✨ [HUG_DAEMON]: Executing cuddle protocol...
          </p>
          <p className="text-zinc-300">
            ❤️ Warmest, tightest hug successfully delivered from{" "}
            {profile.partner1} to {profile.partner2}!
          </p>
          <p className="text-xs text-emerald-400">
            Response 200 OK: Warmth increased by 99999%
          </p>
        </div>
      );
    } else if (trimmed.includes("sudo marry") || trimmed.includes("marry")) {
      soundManager.playTestSuccess();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#f59e0b", "#ec4899", "#8b5cf6"],
      });
      output = (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
          <p className="font-bold text-amber-300">💍 [ROOT_AUTH_SUCCESSFUL]</p>
          <p className="text-zinc-200">
            Permission granted with highest privileges. You already possess root
            access to my entire soul, heart, and future.
          </p>
        </div>
      );
    } else if (trimmed.includes("curl") || trimmed === "curl api/heart") {
      output = (
        <div className="bg-[#05030c] p-3 rounded-lg border border-cyan-500/20 text-xs text-cyan-300 font-mono">
          <pre>
            {JSON.stringify(
              {
                status: 200,
                relationship: "Infinite Loop of Joy",
                latencyToHeart: "0ms",
                [`${p2}_cuteness_index`]: "Infinite",
                [`${p1}_devotion_metric`]: "100%",
                cuddle_request_pending: false,
                next_date: "Tonight & Always",
              },
              null,
              2,
            )}
          </pre>
        </div>
      );
    } else if (trimmed === "git status") {
      output = (
        <div className="space-y-1 text-zinc-300">
          <p className="text-emerald-400">On branch main</p>
          <p>Your branch is up to date with &apos;origin/destiny&apos;.</p>
          <p className="text-pink-400">
            Changes committed: Infinite love, eternal loyalty
          </p>
          <p className="text-zinc-500">
            nothing to stash, working tree completely filled with happiness
          </p>
        </div>
      );
    } else if (trimmed === "heart" || trimmed === "love") {
      output = (
        <pre className="text-pink-400 font-mono text-xs leading-none">
          {`   ******       ******   
 **********   ********** 
************ ************
*************************
 *********************** 
   *******************   
     ***************     
       ***********       
         *******         
           ***           
            *            
   ${profile.partner1}  ❤️  ${profile.partner2}`}
        </pre>
      );
    } else if (trimmed === "whoami") {
      output = (
        <p className="text-zinc-300">
          The luckiest person in the universe:{" "}
          <span className="text-pink-400 font-bold">{profile.partner1}</span>,
          forever captivated by{" "}
          <span className="text-pink-400 font-bold">{profile.partner2}</span>.
        </p>
      );
    } else {
      output = (
        <p className="text-rose-400">
          Command not recognized:{" "}
          <code className="bg-rose-500/10 px-1 rounded">{cmd}</code>. Type{" "}
          <span className="text-cyan-400 font-bold">help</span> to view
          available commands.
        </p>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const quickCommands = [
    "cat love-letter.txt",
    "npm run hug",
    `sudo marry ${p2}`,
    "curl api/heart",
    "git status",
    "heart",
    "help",
    "clear",
  ];

  return (
    <section id="terminal" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE LOVE SHELL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            The Love CLI Terminal
          </h2>
          <p className="text-zinc-400 text-sm">
            Type commands into the terminal or click the shortcut chips below to
            query feelings and execute cuddle protocols.
          </p>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/40 text-zinc-300 hover:text-pink-300 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Box */}
        <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0a0717] shadow-2xl shadow-purple-950/40">
          {/* Header */}
          <div className="bg-[#120e24] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono text-zinc-400 ml-2">
                bash: {p1}@{p2}-heart:~ (zsh)
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              connected
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-80 overflow-y-auto space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-pink-400 font-bold">
                    {p1}@{p2}:~$
                  </span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#0d091e] border-t border-white/10 flex items-center gap-2 font-mono text-xs sm:text-sm"
          >
            <span className="text-pink-400 font-bold pl-2">
              {p1}@{p2}:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={`Type command here (e.g. npm run hug)...`}
              className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-zinc-600 text-xs sm:text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 transition-colors flex items-center gap-1 text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run</span>
              <CornerDownLeft className="w-3 h-3 text-zinc-400" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
