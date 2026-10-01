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
        <div className="space-y-1 text-[#4D243B]">
          <p className="text-[#B81365] font-bold">
            ✨ Welcome to the {profile.partner1} &amp; {profile.partner2} Love
            Terminal (v2.0.0-LTS)
          </p>
          <p className="text-[#7C4863]">
            Type <span className="text-[#BA68C8] font-bold">help</span> or click any quick
            command chip below to explore without page scrolling.
          </p>
        </div>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  // Scroll ONLY the terminal box interior so the newest output is visible,
  // NEVER scroll the browser window/page!
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
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
        <div className="space-y-1.5 text-[#3B1828]">
          <p className="text-[#B81365] font-bold">Available Commands:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-1.5 rounded-lg bg-pink-50 border border-pink-200">
              <span className="text-[#FF2E93] font-bold">cat love-letter.txt</span> - Read personal letter
            </div>
            <div className="p-1.5 rounded-lg bg-pink-50 border border-pink-200">
              <span className="text-[#FF2E93] font-bold">npm run hug</span> - Send instant warm hugs
            </div>
            <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200">
              <span className="text-[#BA68C8] font-bold">sudo marry {p2}</span> - Check marriage privileges
            </div>
            <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200">
              <span className="text-cyan-700 font-bold">curl api/heart</span> - Fetch current feelings
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-700 font-bold">git status</span> - Check relationship state
            </div>
            <div className="p-1.5 rounded-lg bg-pink-50 border border-pink-200">
              <span className="text-[#FF2E93] font-bold">heart</span> - Display ASCII Love Art
            </div>
            <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-amber-700 font-bold">clear</span> - Clear the terminal
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
        <div className="p-4 rounded-2xl bg-[#FFDBF1]/60 border border-[#FF8CBF]/60 text-[#3B1828] space-y-2 shadow-sm">
          <p className="font-bold text-[#B81365] flex items-center gap-1.5">
            <span>💌</span>
            <span>{profile.loveLetterTitle}</span>
          </p>
          <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed font-sans text-[#4D243B]">
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
        colors: ["#FF5C9D", "#BA68C8", "#FFDBF1", "#38bdf8", "#fbbf24"],
      });
      output = (
        <div className="text-[#B81365] space-y-1 p-3 rounded-2xl bg-[#FFDBF1]/40 border border-[#FF8CBF]/40">
          <p className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FF2E93]" />
            <span>[HUG_DAEMON]: Executing cuddle protocol...</span>
          </p>
          <p className="text-[#3B1828]">
            ❤️ Warmest, tightest hug successfully delivered from{" "}
            <strong>{profile.partner1}</strong> to <strong>{profile.partner2}</strong>!
          </p>
          <p className="text-xs text-emerald-700 font-semibold font-mono">
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
        colors: ["#FF5C9D", "#BA68C8", "#fbbf24"],
      });
      output = (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-[#3B1828] space-y-1.5 shadow-sm">
          <p className="font-bold text-amber-800 flex items-center gap-1.5">
            <span>💍</span>
            <span>[ROOT_AUTH_SUCCESSFUL]</span>
          </p>
          <p className="text-[#4D243B]">
            Permission granted with highest privileges. You already possess root
            access to my entire soul, heart, and future.
          </p>
        </div>
      );
    } else if (trimmed.includes("curl") || trimmed === "curl api/heart") {
      output = (
        <div className="bg-[#FFF0F7] p-3.5 rounded-2xl border border-[#FFB8DC] text-xs text-[#3B1828] font-mono shadow-sm">
          <pre className="overflow-x-auto">
            {JSON.stringify(
              {
                status: 200,
                relationship: "Infinite Loop of Joy",
                partner1: profile.partner1,
                partner2: profile.partner2,
                loveLevel: "Infinity %",
                heartbeatFrequency: "Synchronized",
                deploymentReady: true,
              },
              null,
              2
            )}
          </pre>
        </div>
      );
    } else if (trimmed === "git status") {
      output = (
        <div className="space-y-1 font-mono text-xs text-[#3B1828] p-3 rounded-2xl bg-[#FFF8FB] border border-[#FFD6EA]">
          <p className="text-emerald-700 font-bold">On branch heart/forever</p>
          <p className="text-[#7C4863]">
            Your branch is up to date with &apos;destiny/eternal&apos;.
          </p>
          <p className="text-[#7C4863]">
            nothing to stash, working tree completely filled with happiness 💕
          </p>
        </div>
      );
    } else if (trimmed === "heart" || trimmed === "love") {
      output = (
        <pre className="text-[#FF2E93] font-mono text-xs leading-none py-2 font-bold overflow-x-auto">
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
        <p className="text-[#3B1828] p-2.5 rounded-xl bg-pink-50 border border-pink-200">
          The luckiest person in the universe:{" "}
          <span className="text-[#FF2E93] font-bold">{profile.partner1}</span>,
          forever captivated by{" "}
          <span className="text-[#FF2E93] font-bold">{profile.partner2}</span>.
        </p>
      );
    } else {
      output = (
        <p className="text-rose-700 p-2.5 rounded-xl bg-rose-50 border border-rose-200 font-mono text-xs">
          Command not recognized:{" "}
          <code className="bg-rose-100 px-1 py-0.5 rounded font-bold">{cmd}</code>. Type{" "}
          <span className="text-[#BA68C8] font-bold">help</span> to view
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFDBF1] border border-[#FF8CBF]/60 text-[#B81365] text-xs font-mono font-bold mb-3 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-[#FF2E93]" />
            <span>INTERACTIVE LOVE SHELL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3B1828] tracking-tight mb-2">
            The Love CLI Terminal
          </h2>
          <p className="text-[#7C4863] text-sm">
            Type commands into the terminal or click the shortcut chips below to
            query feelings and execute cuddle protocols without jumping or page scroll.
          </p>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              className="text-xs font-mono font-medium px-3 py-1.5 rounded-xl bg-white border border-[#FFD6EA] hover:border-[#FF5C9D] text-[#7C4863] hover:text-[#B81365] hover:bg-[#FFDBF1] transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#FF2E93]" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Box */}
        <div className="rounded-3xl overflow-hidden border-2 border-[#FFB8DC] bg-[#FFF8FB] shadow-xl shadow-pink-200/50">
          {/* Header */}
          <div className="bg-[#FFDBF1]/90 px-4 py-3 border-b border-[#FFB8DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-sm" />
              <span className="text-xs font-mono font-bold text-[#7C4863] ml-2">
                bash: {p1}@{p2}-heart:~ (zsh)
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              connected
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-80 overflow-y-auto space-y-4 bg-white/70 text-[#3B1828]"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#7C4863]">
                  <span className="text-[#FF2E93] font-bold">
                    {p1}@{p2}:~$
                  </span>
                  <span className="text-[#3B1828] font-bold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
          </div>

          {/* Terminal Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#FFDBF1]/60 border-t border-[#FFB8DC] flex items-center gap-2 font-mono text-xs sm:text-sm"
          >
            <span className="text-[#FF2E93] font-bold pl-2">
              {p1}@{p2}:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={`Type command here (e.g. npm run hug)...`}
              className="flex-1 bg-transparent border-none text-[#3B1828] focus:outline-none placeholder:text-[#9E6585] text-xs sm:text-sm font-semibold"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-gradient-to-r from-[#FF5C9D] via-[#FF2E93] to-[#BA68C8] hover:opacity-95 text-white transition-all flex items-center gap-1 text-xs font-bold shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run</span>
              <CornerDownLeft className="w-3 h-3 text-pink-200" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
