const _jsxFileName = "src/components/dashboard/CategoryChart.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useAppContext } from "@/context/AppContext";
import { formatCurrency } from "@/lib/helpers";

const COLORS = [
  "hsl(220, 70%, 50%)",
  "hsl(152, 60%, 42%)",
  "hsl(0, 72%, 51%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(190, 70%, 45%)",
  "hsl(340, 65%, 50%)",
  "hsl(160, 50%, 35%)",
];

/** Clean doughnut chart of expenses grouped by category */
export default function CategoryChart() {
  const { transactions } = useAppContext();

  const data = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  return (
    _jsxDEV('div', { className: "rounded-xl border bg-card p-5 shadow-sm"    , children: [
      _jsxDEV('h3', { className: "mb-4 text-sm font-semibold"  , children: "Expenses by Category"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)

      , _jsxDEV('div', { className: "flex flex-col sm:flex-row items-center gap-4"    , children: [
        /* Chart */
        _jsxDEV('div', { className: "w-full sm:w-1/2 min-h-[220px]"  , children: 
          _jsxDEV(ResponsiveContainer, { width: "100%", height: 220, children: 
            _jsxDEV(PieChart, { children: [
              _jsxDEV(Pie, {
                data: data,
                cx: "50%",
                cy: "50%",
                innerRadius: 55,
                outerRadius: 90,
                paddingAngle: 3,
                dataKey: "value",
                stroke: "none",
 children: 
                data.map((_, i) => (
                  _jsxDEV(Cell, { fill: COLORS[i % COLORS.length],}, i, false, {fileName: _jsxFileName, lineNumber: 56}, this )
                ))
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 45}, this)
              , _jsxDEV(Tooltip, {
                formatter: (value) => formatCurrency(value),
                contentStyle: {
                  backgroundColor: "hsl(var(--popover))",
                  color: "hsl(var(--popover-foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                },}, void 0, false, {fileName: _jsxFileName, lineNumber: 59}, this
              )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 44}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)

        /* Legend list */
        , _jsxDEV('div', { className: "w-full sm:w-1/2 space-y-2"  , children: 
          data.map((item, i) => {
            const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
            return (
              _jsxDEV('div', { className: "flex items-center justify-between text-sm"   , children: [
                _jsxDEV('div', { className: "flex items-center gap-2 min-w-0"   , children: [
                  _jsxDEV('span', {
                    className: "inline-block h-3 w-3 rounded-full shrink-0"    ,
                    style: { backgroundColor: COLORS[i % COLORS.length] },}, void 0, false, {fileName: _jsxFileName, lineNumber: 80}, this
                  )
                  , _jsxDEV('span', { className: "truncate text-muted-foreground" , children: item.name}, void 0, false, {fileName: _jsxFileName, lineNumber: 84}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 79}, this)
                , _jsxDEV('div', { className: "flex items-center gap-3 shrink-0"   , children: [
                  _jsxDEV('span', { className: "font-medium", children: [pct, "%"]}, void 0, true, {fileName: _jsxFileName, lineNumber: 87}, this)
                  , _jsxDEV('span', { className: "text-xs text-muted-foreground w-[70px] text-right"   , children: 
                    formatCurrency(item.value)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 88}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 86}, this)
              ]}, item.name, true, {fileName: _jsxFileName, lineNumber: 78}, this)
            );
          })
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 74}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 40}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 37}, this)
  );
}
