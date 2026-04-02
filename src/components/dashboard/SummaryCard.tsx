import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/helpers";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  trend: number; // percentage change
  icon: LucideIcon;
  variant?: "default" | "income" | "expense";
}

/** A single summary metric card */
export default function SummaryCard({ title, value, trend, icon: Icon, variant = "default" }: SummaryCardProps) {
  const isPositive = trend >= 0;

  // Map variant to accent colors via CSS variables
  const accentClass =
    variant === "income"
      ? "text-success"
      : variant === "expense"
        ? "text-destructive"
        : "text-primary";

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={`rounded-lg bg-accent p-2 ${accentClass}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-2 text-2xl font-bold tracking-tight">{formatCurrency(value)}</p>

      <div className="mt-2 flex items-center gap-1 text-xs">
        {isPositive ? (
          <TrendingUp className="h-3 w-3 text-success" />
        ) : (
          <TrendingDown className="h-3 w-3 text-destructive" />
        )}
        <span className={isPositive ? "text-success" : "text-destructive"}>
          {isPositive ? "+" : ""}
          {trend}%
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}
