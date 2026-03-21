import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "coming-soon";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-label font-medium",
        {
          "bg-accent/10 text-accent border border-accent/20": variant === "default",
          "bg-success/10 text-success border border-success/20": variant === "success",
          "bg-warning/10 text-warning border border-warning/20": variant === "warning",
          "bg-danger/10 text-danger border border-danger/20":   variant === "danger",
          "bg-bg-elevated text-text-secondary border border-border-subtle animate-pulse-badge":
            variant === "coming-soon",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
