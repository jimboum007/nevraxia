"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  blue: boolean;
  hub: boolean;
  pulse: number;  // phase for breathing effect
}

export default function BackgroundHeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let particles: Particle[] = [];
    let W = 0;
    let H = 0;
    let lastTs = 0;
    let frame = 0;
    const INTERVAL = 1000 / 30; // 30 fps

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      // More particles, denser network
      const count = W < 640 ? 55 : W < 1024 ? 80 : 110;
      particles = Array.from({ length: count }, (_, i) => {
        const hub = i < Math.round(count * 0.12);
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * (hub ? 0.2 : 0.45),
          vy: (Math.random() - 0.5) * (hub ? 0.2 : 0.45),
          r: hub ? Math.random() * 1.2 + 2.2 : Math.random() * 1.0 + 0.5,
          opacity: hub ? 0.85 : Math.random() * 0.45 + 0.25,
          blue: Math.random() < 0.6,
          hub,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    }

    function render() {
      c.clearRect(0, 0, W, H);

      const LINK = W < 640 ? 110 : 160;
      const t = frame * 0.018;

      // Connection lines — much more visible
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const dist = Math.sqrt(d2);
          const fade = 1 - dist / LINK;

          // Stronger alpha — was 0.1, now up to 0.35
          const baseAlpha = a.hub || b.hub ? 0.35 : 0.18;
          const alpha = fade * fade * baseAlpha;

          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(b.x, b.y);
          c.strokeStyle = a.blue
            ? `rgba(56,139,253,${alpha})`
            : `rgba(57,208,216,${alpha})`;
          c.lineWidth = a.hub || b.hub ? 1.1 : 0.7;
          c.stroke();
        }
      }

      // Nodes — larger glow, brighter core
      for (const p of particles) {
        const [r, g, b] = p.blue ? [56, 139, 253] : [57, 208, 216];
        const breathe = p.hub ? 1 + 0.25 * Math.sin(t + p.pulse) : 1;
        const glowR = p.r * (p.hub ? 10 : 7) * breathe;

        // Outer glow
        c.beginPath();
        c.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${p.opacity * 0.1 * breathe})`;
        c.fill();

        // Mid glow
        c.beginPath();
        c.arc(p.x, p.y, glowR * 0.5, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${p.opacity * 0.18})`;
        c.fill();

        // Core dot
        c.beginPath();
        c.arc(p.x, p.y, p.r * breathe, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        c.fill();
      }

      // Move
      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = W + 20;
          else if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20;
          else if (p.y > H + 20) p.y = -20;
        }
        frame++;
      }
    }

    function animate(ts: number) {
      raf = requestAnimationFrame(animate);
      if (ts - lastTs < INTERVAL) return;
      lastTs = ts;
      render();
    }

    setup();
    render();

    if (!reduced) {
      raf = requestAnimationFrame(animate);
    }

    const onResize = () => {
      setup();
      render();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
