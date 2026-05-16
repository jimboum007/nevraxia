import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light"; // conservé pour compatibilité API
};

// Image native: 430 × 145 px → ratio ≈ 2.97
const sizes: Record<string, { h: number; w: number }> = {
  sm: { h: 24, w: 71 },
  md: { h: 44, w: 131 },
  lg: { h: 52, w: 154 },
  xl: { h: 68, w: 202 },
};

export default function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const { h, w } = sizes[size];
  return (
    <Image
      src="/logo.png"
      alt="Nevraxia"
      height={h}
      width={w}
      style={{
        height: h,
        width: "auto",
        // logo designed for light bg — invert luminosity, restore hue on dark variant
        filter: variant === "dark" ? "invert(1) hue-rotate(180deg)" : "none",
      }}
      priority
    />
  );
}
