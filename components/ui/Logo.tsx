import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light"; // conservé pour compatibilité API
};

// Image native: 398 × 142 px → ratio ≈ 2.8
const sizes: Record<string, { h: number; w: number }> = {
  sm: { h: 24, w: 67 },
  md: { h: 30, w: 84 },
  lg: { h: 38, w: 107 },
  xl: { h: 60, w: 168 },
};

export default function Logo({ size = "md" }: LogoProps) {
  const { h, w } = sizes[size];
  return (
    <Image
      src="/logo.png"
      alt="Nevraxia"
      height={h}
      width={w}
      style={{ height: h, width: "auto" }}
      priority
    />
  );
}
