"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: "heart" | "star" | "code";
  text?: string;
  rotation: number;
  rotSpeed: number;
}

export default function LoveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const codeSnippets = ["01001100", "01001111", "01010110", "01000101", "LOVE", "git commit", "💖", "while(true)", "✨", "01"];

    // Initialize particles
    const particleCount = Math.min(width > 768 ? 45 : 22, 50);
    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: "heart" | "star" | "code" =
        typeRand < 0.4 ? "heart" : typeRand < 0.75 ? "star" : "code";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === "heart" ? 14 + Math.random() * 12 : type === "code" ? 11 + Math.random() * 4 : 2 + Math.random() * 3,
        speedY: -(0.3 + Math.random() * 0.7),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: 0.15 + Math.random() * 0.4,
        type,
        text: type === "code" ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)] : undefined,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.scale(size / 20, size / 20);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-10, -10, -20, 5, 0, 20);
      c.bezierCurveTo(20, 5, 10, -10, 0, 0);
      c.fillStyle = `rgba(255, 46, 147, ${opacity})`;
      c.shadowColor = "#ff2e93";
      c.shadowBlur = 10;
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        // Wrap around top to bottom
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.rotation);
        } else if (p.type === "star") {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        } else if (p.type === "code" && p.text) {
          ctx.save();
          ctx.font = `600 ${p.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
          ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity * 0.7})`;
          ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
          ctx.shadowBlur = 6;
          ctx.fillText(p.text, p.x, p.y);
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Spawns little hearts on mouse click
    const handleCanvasClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: 16 + Math.random() * 10,
          speedY: -(1.5 + Math.random() * 1.5),
          speedX: (Math.random() - 0.5) * 2,
          opacity: 0.8,
          type: "heart",
          rotation: (Math.random() - 0.5) * 0.5,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
      // Remove excess particles
      if (particles.length > 70) {
        particles.splice(0, particles.length - 70);
      }
    };

    window.addEventListener("click", handleCanvasClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      />
      {/* Cosmic background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-transparent blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-purple-700/15 via-pink-500/10 to-transparent blur-[130px]" />
        <div className="absolute -bottom-40 left-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-purple-800/10 to-transparent blur-[110px]" />
      </div>
    </>
  );
}
