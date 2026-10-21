import { Cpu, HardDrive, Joystick, Monitor, ShieldCheck } from "lucide-react";

const ICONS = {
  cpu: Cpu,
  os: Monitor,
  platform: Joystick,
  shield: ShieldCheck,
  drive: HardDrive,
} as const;

export type RequirementIconKey = keyof typeof ICONS;

export function RequirementIcon({ name, size = 14 }: { name: RequirementIconKey; size?: number }) {
  const Component = ICONS[name];
  return <Component size={size} />;
}
