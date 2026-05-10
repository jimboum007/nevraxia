import type { Metadata } from "next";
import { spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neuraxia — Intelligence médicale sur mesure",
  description: "Neuraxia automatise vos rapports cliniques, monitore votre activité économique et benchmark vos performances avec les meilleurs centres européens.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={spaceGrotesk.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
