import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light"; // conservé pour compatibilité API
};

const heights: Record<string, number> = {
  sm: 28,
  md: 32,
  lg: 40,
  xl: 64,
};

export default function Logo({ size = "md" }: LogoProps) {
  const h = heights[size];
  return (
    <Image
      src="/logo.png"
      alt="Nevraxia"
      height={h}
      width={h * 6}
      style={{ height: h, width: "auto" }}
      priority
    />
  );
}
