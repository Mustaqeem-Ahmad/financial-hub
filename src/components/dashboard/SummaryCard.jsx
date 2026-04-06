const _jsxFileName = "src/components/dashboard/SummaryCard.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/helpers";










/** A single summary metric card */
export default function SummaryCard({ title, value, trend, icon: Icon, variant = "default" }) {
  const isPositive = trend >= 0;

  // Map variant to accent colors via CSS variables
  const accentClass =
    variant === "income"
      ? "text-success"
      : variant === "expense"
        ? "text-destructive"
        : "text-primary";

  return (
    _jsxDEV('div', { className: "rounded-xl border bg-card p-5 shadow-sm animate-fade-in"     , children: [
      _jsxDEV('div', { className: "flex items-center justify-between"  , children: [
        _jsxDEV('span', { className: "text-sm font-medium text-muted-foreground"  , children: title}, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this)
        , _jsxDEV('div', { className: `rounded-lg bg-accent p-2 ${accentClass}`, children: 
          _jsxDEV(Icon, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 30}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 27}, this)

      , _jsxDEV('p', { className: "mt-2 text-2xl font-bold tracking-tight"   , children: formatCurrency(value)}, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this)

      , _jsxDEV('div', { className: "mt-2 flex items-center gap-1 text-xs"    , children: [
        isPositive ? (
          _jsxDEV(TrendingUp, { className: "h-3 w-3 text-success"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this )
        ) : (
          _jsxDEV(TrendingDown, { className: "h-3 w-3 text-destructive"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this )
        )
        , _jsxDEV('span', { className: isPositive ? "text-success" : "text-destructive", children: [
          isPositive ? "+" : ""
          , trend, "%"
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 42}, this)
        , _jsxDEV('span', { className: "text-muted-foreground", children: "vs last month"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 46}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 36}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 26}, this)
  );
}
