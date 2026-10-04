"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Heart, Tag, Calendar, X, Sparkles, Plus } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/soundEffects";
import { PhotoMemory } from "@/lib/types";

interface PhotoVaultProps {
  photos: PhotoMemory[];
  onAddPhoto?: (photo: PhotoMemory) => void;
}

export default function PhotoVault({ photos: initialPhotos }: PhotoVaultProps) {
  const [photos, setPhotos] = useState<PhotoMemory[]>(initialPhotos);
  const [filter, setFilter] = useState<"all" | "dates" | "trips" | "milestones">("all");
  const [activePhoto, setActivePhoto] = useState<PhotoMemory | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playLoveChime();
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#ff2e93", "#ec4899", "#8b5cf6"],
    });
  };

  const filteredPhotos =
    filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <section id="vault" className="scroll-mt-24 py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>GIT LFS ASSET VAULT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Our Memory Snapshot Vault
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Snapshots of our journey, preserved in lossless emotional fidelity. Click any memory to inspect.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {(["all", "dates", "trips", "milestones"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playKeyClick();
                  setFilter(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono capitalize transition-all ${
                  filter === cat
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/25 border-pink-400"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat === "all" ? "All Memories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => {
            const isLiked = !!likedMap[photo.id];
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/10 cursor-pointer group transition-all duration-300 flex flex-col"
              >
                {/* Photo Top Bar */}
                <div className="bg-[#120e24] px-4 py-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="truncate max-w-[180px]">{photo.title.toLowerCase().replace(/\s+/g, "_")}.png</span>
                  <span className="text-pink-400">#{photo.category}</span>
                </div>

                {/* Photo Image with Zoom on Hover */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/40">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090716] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Date Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-pink-400" />
                    <span>{photo.date}</span>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className={`absolute bottom-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                      isLiked
                        ? "bg-pink-500 text-white border-pink-400"
                        : "bg-black/60 hover:bg-black/80 text-zinc-300 border-white/10 hover:text-pink-400"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold">
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-white" : ""}`} />
                      <span>{photo.likes}</span>
                    </div>
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors mb-2">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-4">
                      {photo.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {photo.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5 text-purple-400" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="bg-[#0f0b22] border border-white/15 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image */}
              <div className="relative h-[420px] sm:h-[520px] w-full bg-black/60">
                <Image
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Modal Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-mono uppercase">
                      #{activePhoto.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{activePhoto.date}</span>
                  </div>
                  <button
                    onClick={(e) => handleLike(activePhoto.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-xs font-mono transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                    <span>{activePhoto.likes} Loves</span>
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{activePhoto.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">{activePhoto.description}</p>

                <div className="flex flex-wrap gap-2">
                  {activePhoto.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-purple-300 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
