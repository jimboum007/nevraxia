import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light"; // conservé pour compatibilité API
};

// Image native: 430 × 145 px → ratio ≈ 2.97
const sizes: Record<string, { h: number; w: number }> = {
  sm: { h: 36, w: 107 },
  md: { h: 88, w: 261 },
  lg: { h: 100, w: 297 },
  xl: { h: 120, w: 356 },
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
