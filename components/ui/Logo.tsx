import { spaceGrotesk } from "@/lib/fonts";
import LogoIcon from "./LogoIcon";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light";
  iconOnly?: boolean;
  textOnly?: boolean;
};

const textSizes = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

const iconSizes = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 72,
};

export default function Logo({
  size = "md",
  variant = "dark",
  iconOnly = false,
  textOnly = false,
}: LogoProps) {
  const baseColor = variant === "dark" ? "#F0F6FC" : "#0D1117";

  return (
    <span
      className="inline-flex items-center gap-2.5 select-none"
      style={{ lineHeight: 1 }}
    >
      {!textOnly && <LogoIcon size={iconSizes[size]} />}

      {!iconOnly && (
        <span
          className={`${spaceGrotesk.className} ${textSizes[size]}`}
          style={{ fontWeight: 600, letterSpacing: "-0.03em" }}
        >
          <span style={{ color: baseColor }}>nevrax</span>
          <span
            style={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #1D6FEB, #39D0D8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ia
          </span>
        </span>
      )}
    </span>
  );
}
