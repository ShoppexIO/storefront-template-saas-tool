import { Download, PlayCircle, Sparkles } from "lucide-react";

const ICONS = {
  download: Download,
  spark: Sparkles,
  play: PlayCircle,
} as const;

export type ToolStepIconKey = keyof typeof ICONS;

export function ToolStepIcon({ name, size = 20 }: { name: ToolStepIconKey; size?: number }) {
  const Component = ICONS[name];
  return <Component size={size} />;
}
