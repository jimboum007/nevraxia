import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light"; // conservé pour compatibilité API
};

// Image native: 398 × 142 px → ratio ≈ 2.8
const sizes: Record<string, { h: number; w: number }> = {
  sm: { h: 24, w: 67 },
  md: { h: 44, w: 123 },
  lg: { h: 52, w: 146 },
  xl: { h: 68, w: 191 },
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
