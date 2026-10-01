"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  RotateCcw,
  Sparkles,
  Heart,
  Lock,
  Unlock,
  KeyRound,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Calendar,
  PenTool,
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { CoupleProfile } from "@/lib/types";
import { DEFAULT_COUPLE_PROFILE } from "@/lib/defaultData";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: CoupleProfile;
  onSave: (newProfile: CoupleProfile) => void;
}

// Static login credentials
const STATIC_USERNAMES = ["tola", "admin", "tola&lina", "lina"];
const STATIC_PASSWORDS = ["lina", "tola", "2409", "love", "1234", "love123"];

export default function SettingsModal({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}: SettingsModalProps) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Edit form state
  const [formData, setFormData] = useState<CoupleProfile>(currentProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync formData whenever currentProfile updates
  useEffect(() => {
    setFormData(currentProfile);
  }, [currentProfile]);

  // Reset errors when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setLoginError("");
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Static Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playKeyClick();

    const cleanUser = usernameInput.toLowerCase().trim();
    const cleanPass = passwordInput.toLowerCase().trim();

    const isUserValid = STATIC_USERNAMES.includes(cleanUser);
    const isPassValid = STATIC_PASSWORDS.includes(cleanPass);

    if (isUserValid && isPassValid) {
      // Login Success!
      soundManager.playLoveChime();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#FF5C9D", "#BA68C8", "#FFDBF1", "#10B981"],
      });

      setIsAuthenticated(true);
      setLoginError("");
      setUsernameInput("");
      setPasswordInput("");
    } else {
      // Login Failed
      soundManager.playTone(280, "sawtooth", 0.25, 0.2);
      setLoginError(
        "❌ Login failed! Incorrect username or password. Please use static login: tola / lina"
      );
    }
  };

  // Quick Auto-fill for seamless testing
  const handleAutoFill = () => {
    soundManager.playKeyClick();
    setUsernameInput("tola1212");
    setPasswordInput("@@##$$");
    setLoginError("");
  };

  // Handle Logout / Lock
  const handleLogout = () => {
    soundManager.playKeyClick();
    setIsAuthenticated(false);
    setLoginError("");
  };

  // Handle Profile Update Save
  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playLoveChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF5C9D", "#BA68C8", "#FFDBF1", "#FFE5D9"],
    });

    onSave(formData);
    setSaveSuccess(true);

    setTimeout(() => {
      onClose();
      setSaveSuccess(false);
    }, 800);
  };

  // Handle Reset to Defaults
  const handleResetDefaults = () => {
    soundManager.playKeyClick();
    if (confirm("Reset couple profile back to initial defaults?")) {
      setFormData(DEFAULT_COUPLE_PROFILE);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#3B1828]/50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF8FB] border-2 border-[#FFB8DC] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl shadow-pink-200/60 relative my-8 overflow-hidden transition-all text-[#3B1828]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#FFDBF1] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#E8D4FF] rounded-full blur-3xl pointer-events-none" />

        {/* ======================================================== */}
        {/* CASE 1: NOT AUTHENTICATED -> SHOW STATIC LOGIN FORM     */}
        {/* ======================================================== */}
        {!isAuthenticated ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#FFB8DC]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFDBF1] border border-[#FF8CBF] flex items-center justify-center text-[#FF2E93] shadow-sm">
                  <Lock className="w-5 h-5 text-[#FF2E93]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3B1828] font-mono flex items-center gap-2">
                    <span>Couple Root Access</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-[#B81365] border border-pink-200 font-semibold">
                      Protected
                    </span>
                  </h3>
                  <p className="text-xs text-[#7C4863]">
                    Please login to edit Tola &amp; Lina&apos;s relationship settings
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#FFDBF1] hover:bg-[#FFC9E8] text-[#7C4863] hover:text-[#3B1828] border border-[#FFB8DC] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Static Login Credentials Banner */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#FFD6EA] shadow-sm mb-5">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-[#B81365] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>STATIC LOGIN CREDENTIALS:</span>
                </span>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="text-[11px] font-mono font-bold text-[#FF2E93] hover:text-[#B81365] underline hover:no-underline cursor-pointer"
                >
                  ⚡ Auto-fill credentials
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#4D243B] bg-[#FFF0F7] p-2.5 rounded-xl border border-[#FFD6EA]">
                <div>
                  Username: <strong className="text-[#3B1828]">tola</strong>
                </div>
                <div>
                  Password: <strong className="text-[#3B1828]">lina</strong>
                </div>
              </div>
            </div>

            {/* Error Message Box if false */}
            {loginError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono mb-5 flex items-start gap-2.5 shadow-sm">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed font-semibold">{loginError}</div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>Username</span>
                </label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    if (loginError) setLoginError("");
                  }}
                  placeholder="Enter username (e.g. tola)"
                  className="w-full bg-white border border-[#FFB8DC] rounded-2xl px-3.5 py-2.5 text-sm text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] focus:ring-2 focus:ring-[#FFDBF1] font-mono shadow-inner transition-all placeholder:text-[#B896A9]"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (loginError) setLoginError("");
                    }}
                    placeholder="Enter password (e.g. lina)"
                    className="w-full bg-white border border-[#FFB8DC] rounded-2xl px-3.5 py-2.5 pr-10 text-sm text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] focus:ring-2 focus:ring-[#FFDBF1] font-mono shadow-inner transition-all placeholder:text-[#B896A9]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C4863] hover:text-[#3B1828] p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-2xl text-xs font-mono font-semibold text-[#7C4863] hover:text-[#3B1828] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5C9D] via-[#FF2E93] to-[#BA68C8] hover:opacity-95 text-white font-mono text-xs font-bold shadow-md shadow-pink-300/40 active:scale-95 transition-all cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Log In &amp; Edit</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ======================================================== */
          /* CASE 2: AUTHENTICATED -> SHOW FORM FOR EDIT & UPDATE     */
          /* ======================================================== */
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#FFB8DC]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFDBF1] border border-[#FF8CBF] flex items-center justify-center text-[#FF2E93] shadow-sm">
                  <PenTool className="w-5 h-5 text-[#FF2E93]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3B1828] font-mono flex items-center gap-2">
                    <span>Edit Couple Profile</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Root Active
                    </span>
                  </h3>
                  <p className="text-xs text-[#7C4863]">
                    Update names, anniversary milestone date &amp; romantic vows
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  title="Lock / Log Out"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 border border-pink-300 text-xs font-mono font-bold text-[#B81365] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-[#FFDBF1] hover:bg-[#FFC9E8] text-[#7C4863] hover:text-[#3B1828] border border-[#FFB8DC] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Save Success Banner */}
            {saveSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono mb-4 flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Changes saved successfully! Updating site...</span>
              </div>
            )}

            {/* Edit Profile Form */}
            <form onSubmit={handleSaveSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {/* Couple Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1">
                    Partner 1 Name
                  </label>
                  <input
                    type="text"
                    value={formData.partner1}
                    onChange={(e) =>
                      setFormData({ ...formData, partner1: e.target.value })
                    }
                    className="w-full bg-white border border-[#FFB8DC] rounded-xl px-3 py-2 text-sm text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-mono shadow-inner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1">
                    Partner 2 Name
                  </label>
                  <input
                    type="text"
                    value={formData.partner2}
                    onChange={(e) =>
                      setFormData({ ...formData, partner2: e.target.value })
                    }
                    className="w-full bg-white border border-[#FFB8DC] rounded-xl px-3 py-2 text-sm text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-mono shadow-inner"
                    required
                  />
                </div>
              </div>

              {/* Anniversary Date */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>Anniversary Milestone Date</span>
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
                  className="w-full bg-white border border-[#FFB8DC] rounded-xl px-3 py-2 text-sm text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-mono shadow-inner"
                  required
                />
              </div>

              {/* Subtitle / Tagline */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1">
                  Relationship Subtitle / Status
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="w-full bg-white border border-[#FFB8DC] rounded-xl px-3 py-2 text-xs text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-mono shadow-inner"
                  placeholder="e.g. Together in production since 2024"
                />
              </div>

              {/* Roles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1">
                    Partner 1 Role
                  </label>
                  <input
                    type="text"
                    value={formData.partner1Role}
                    onChange={(e) =>
                      setFormData({ ...formData, partner1Role: e.target.value })
                    }
                    className="w-full bg-white border border-[#FFB8DC] rounded-xl px-3 py-2 text-xs text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-mono shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1">
                    Partner 2 Role
                  </label>
                  <input
                    type="text"
                    value={formData.partner2Role}
                    onChange={(e) =>
                      setFormData({ ...formData, partner2Role: e.target.value })
                    }
                    className="w-full bg-white border border-[#FFB8DC] rounded-xl px-3 py-2 text-xs text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-mono shadow-inner"
                  />
                </div>
              </div>

              {/* Love Letter Title */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1">
                  Love Letter Title
                </label>
                <input
                  type="text"
                  value={formData.loveLetterTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loveLetterTitle: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-[#FFB8DC] rounded-xl px-3 py-2 text-sm text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-mono shadow-inner"
                />
              </div>

              {/* Love Letter Content */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#4D243B] mb-1">
                  Love Letter Content
                </label>
                <textarea
                  rows={4}
                  value={formData.loveLetterBody}
                  onChange={(e) =>
                    setFormData({ ...formData, loveLetterBody: e.target.value })
                  }
                  className="w-full bg-white border border-[#FFB8DC] rounded-xl p-3 text-xs text-[#3B1828] focus:outline-none focus:border-[#FF5C9D] font-sans leading-relaxed shadow-inner"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#FFB8DC] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFDBF1] hover:bg-[#FFC9E8] border border-[#FF8CBF] text-[#7C4863] hover:text-[#3B1828] text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#7C4863] hover:text-[#3B1828] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5C9D] via-[#FF2E93] to-[#BA68C8] hover:opacity-95 text-white font-mono text-xs font-bold shadow-md shadow-pink-300/40 active:scale-95 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
