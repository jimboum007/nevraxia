import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light"; // conservé pour compatibilité API
};

// Image native: 430 × 145 px → ratio ≈ 2.97
const sizes: Record<string, { h: number; w: number }> = {
  sm: { h: 28, w: 83 },
  md: { h: 68, w: 202 },
  lg: { h: 72, w: 214 },
  xl: { h: 90, w: 267 },
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
