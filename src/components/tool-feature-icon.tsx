import {
  Crosshair,
  Eye,
  Lock,
  Settings2,
  ShieldCheck,
  Target,
  Timer,
  User,
  Zap,
} from "lucide-react";

const ICONS = {
  crosshair: Crosshair,
  zap: Zap,
  shield: ShieldCheck,
  target: Target,
  timer: Timer,
  eye: Eye,
  settings: Settings2,
  user: User,
  lock: Lock,
} as const;

export type ToolFeatureIconKey = keyof typeof ICONS;

export function ToolFeatureIcon({
  name,
  size = 18,
}: {
  name: ToolFeatureIconKey;
  size?: number;
}) {
  const Component = ICONS[name];
  return <Component size={size} />;
}
