"use client";

import React, { useState } from "react";
import { X, Save, RotateCcw, Sparkles, Heart } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";
import { DEFAULT_COUPLE_PROFILE } from "@/lib/defaultData";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: CoupleProfile;
  onSave: (newProfile: CoupleProfile) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}: SettingsModalProps) {
  const [formData, setFormData] = useState<CoupleProfile>(currentProfile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playLoveChime();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    soundManager.playKeyClick();
    setFormData(DEFAULT_COUPLE_PROFILE);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#110d24] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">Personalize Couple Profile</h3>
              <p className="text-xs text-zinc-400">Customize names, anniversary date &amp; message</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1">Partner 1 Name</label>
              <input
                type="text"
                value={formData.partner1}
                onChange={(e) => setFormData({ ...formData, partner1: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-pink-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1">Partner 2 Name</label>
              <input
                type="text"
                value={formData.partner2}
                onChange={(e) => setFormData({ ...formData, partner2: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-pink-500 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1">
              Anniversary Start Date
            </label>
            <input
              type="date"
              value={formData.startDate.split("T")[0]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDate: `${e.target.value}T00:00:00`,
                })
              }
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-pink-500 font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1">Partner 1 Role</label>
              <input
                type="text"
                value={formData.partner1Role}
                onChange={(e) => setFormData({ ...formData, partner1Role: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1">Partner 2 Role</label>
              <input
                type="text"
                value={formData.partner2Role}
                onChange={(e) => setFormData({ ...formData, partner2Role: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1">Love Letter Title</label>
            <input
              type="text"
              value={formData.loveLetterTitle}
              onChange={(e) => setFormData({ ...formData, loveLetterTitle: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-pink-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1">Love Letter Content</label>
            <textarea
              rows={4}
              value={formData.loveLetterBody}
              onChange={(e) => setFormData({ ...formData, loveLetterBody: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-500 font-sans leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-mono text-xs font-semibold shadow-md shadow-pink-500/25 active:scale-95 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
