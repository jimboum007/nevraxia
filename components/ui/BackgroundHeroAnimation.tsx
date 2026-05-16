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
}

export default function BackgroundHeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // alias so closures see non-nullable ctx
    const c = ctx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let particles: Particle[] = [];
    let W = 0;
    let H = 0;
    let lastTs = 0;
    const INTERVAL = 1000 / 24; // 24 fps cap

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = W < 640 ? 38 : W < 1024 ? 55 : 75;
      particles = Array.from({ length: count }, (_, i) => {
        const hub = i < Math.round(count * 0.15);
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * (hub ? 0.18 : 0.38),
          vy: (Math.random() - 0.5) * (hub ? 0.18 : 0.38),
          r: hub ? Math.random() * 0.8 + 1.5 : Math.random() * 0.8 + 0.3,
          opacity: hub ? 0.55 : Math.random() * 0.3 + 0.15,
          blue: Math.random() < 0.65,
          hub,
        };
      });
    }

    function render() {
      c.clearRect(0, 0, W, H);

      const LINK = W < 640 ? 85 : 125;

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const t = 1 - Math.sqrt(d2) / LINK;
          const alpha = t * (a.hub && b.hub ? 0.22 : 0.1);
          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(b.x, b.y);
          c.strokeStyle = a.blue
            ? `rgba(29,111,235,${alpha})`
            : `rgba(57,208,216,${alpha})`;
          c.lineWidth = a.hub && b.hub ? 0.85 : 0.55;
          c.stroke();
        }
      }

      // Nodes
      for (const p of particles) {
        const [r, g, b] = p.blue ? [29, 111, 235] : [57, 208, 216];

        // soft glow ring
        c.beginPath();
        c.arc(p.x, p.y, p.r * (p.hub ? 7 : 5), 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${p.opacity * 0.07})`;
        c.fill();

        // core dot
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        c.fill();
      }

      // Move (wrap-around for seamless looping)
      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = W + 20;
          else if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20;
          else if (p.y > H + 20) p.y = -20;
        }
      }
    }

    function animate(ts: number) {
      raf = requestAnimationFrame(animate);
      if (ts - lastTs < INTERVAL) return;
      lastTs = ts;
      render();
    }

    setup();
    render(); // always draw initial static frame

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
