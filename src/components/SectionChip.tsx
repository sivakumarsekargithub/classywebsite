interface SectionChipProps {
  label: string;
  color?: "blue" | "teal" | "amber" | "navy";
}

const colorMap = {
  blue: "bg-sky text-blue",
  teal: "bg-teal/10 text-teal",
  amber: "bg-amber/10 text-amber",
  navy: "bg-navy/10 text-navy",
};

export function SectionChip({ label, color = "blue" }: SectionChipProps) {
  return (
    <span className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold font-body ${colorMap[color]}`}>
      {label}
    </span>
  );
}
