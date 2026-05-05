import { cn } from "@/lib/utils";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "teal";
  children: React.ReactNode;
}

export function PillButton({ variant = "primary", children, className, ...props }: PillButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold font-body transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue text-primary-foreground hover:brightness-110 shadow-md shadow-blue/20",
    outline: "border-2 border-blue text-blue hover:bg-blue hover:text-primary-foreground",
    teal: "bg-teal text-accent-foreground hover:bg-teal-light shadow-md shadow-teal/20",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
