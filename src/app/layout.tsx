import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { FloatingPillNav } from "@/components/floating-pill-nav";
import { SiteFooter } from "@/components/site-footer";
import { themeConfig } from "@/lib/theme-config";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: `${themeConfig.brandName} — ${themeConfig.brandTaglineShort}`,
  description: themeConfig.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // CUSTOMIZE: Brand color tokens flow into CSS variables here.
  // Edit theme.config.ts colors to rebrand without touching CSS.
  const themeStyle = {
    "--background": themeConfig.colors.background,
    "--foreground": themeConfig.colors.foreground,
    "--muted": themeConfig.colors.muted,
    "--surface": themeConfig.colors.surface,
    "--surface-strong": themeConfig.colors.surfaceStrong,
    "--border": themeConfig.colors.border,
    "--border-strong": themeConfig.colors.borderStrong,
    "--accent": themeConfig.colors.accent,
    "--accent-strong": themeConfig.colors.accentStrong,
    "--accent-soft": themeConfig.colors.accentSoft,
    "--accent-foreground": themeConfig.colors.accentForeground,
    "--success": themeConfig.colors.success,
    "--success-soft": themeConfig.colors.successSoft,
    "--danger": themeConfig.colors.danger,
    "--danger-soft": themeConfig.colors.dangerSoft,
    "--warning": themeConfig.colors.warning,
    "--warning-soft": themeConfig.colors.warningSoft,
  } as CSSProperties;

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body style={themeStyle}>
        <FloatingPillNav />
        {children}
        <SiteFooter />
        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
