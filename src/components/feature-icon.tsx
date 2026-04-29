import { Infinity, RefreshCw, Rocket, Settings2, ShieldCheck, Zap } from "lucide-react";

const ICONS = {
  shield: ShieldCheck,
  rocket: Rocket,
  infinite: Infinity,
  settings: Settings2,
  zap: Zap,
  refresh: RefreshCw,
} as const;

export type FeatureIconKey = keyof typeof ICONS;

export function FeatureIcon({ name, size = 22 }: { name: FeatureIconKey; size?: number }) {
  const Component = ICONS[name];
  return <Component size={size} />;
}
