const _jsxFileName = "src/components/dashboard/BalanceChart.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAppContext } from "@/context/AppContext";

/** Line chart showing balance over the last 12 months */
export default function BalanceChart() {
  const { transactions } = useAppContext();

  const chartData = useMemo(() => {
    const now = new Date();
    const months = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("en-US", { month: "short" });

      const monthTxns = transactions.filter((t) => t.date.startsWith(key));
      const income = monthTxns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
      const expenses = monthTxns.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

      months.push({ name: label, income, expenses, balance: income - expenses });
    }
    return months;
  }, [transactions]);

  return (
    _jsxDEV('div', { className: "rounded-xl border bg-card p-5 shadow-sm"    , children: [
      _jsxDEV('h3', { className: "mb-4 text-sm font-semibold"  , children: "Balance Over Time"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
      , _jsxDEV(ResponsiveContainer, { width: "100%", height: 280, children: 
        _jsxDEV(LineChart, { data: chartData, children: [
          _jsxDEV(CartesianGrid, { strokeDasharray: "3 3" , stroke: "hsl(var(--border))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this )
          , _jsxDEV(XAxis, { dataKey: "name", tick: { fontSize: 12 }, stroke: "hsl(var(--muted-foreground))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this )
          , _jsxDEV(YAxis, { tick: { fontSize: 12 }, stroke: "hsl(var(--muted-foreground))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this )
          , _jsxDEV(Tooltip, {
            contentStyle: {
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            },}, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this
          )
          , _jsxDEV(Legend, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 52}, this )
          , _jsxDEV(Line, { type: "monotone", dataKey: "income", stroke: "hsl(var(--chart-income))", strokeWidth: 2, dot: false,}, void 0, false, {fileName: _jsxFileName, lineNumber: 53}, this )
          , _jsxDEV(Line, { type: "monotone", dataKey: "expenses", stroke: "hsl(var(--chart-expense))", strokeWidth: 2, dot: false,}, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this )
          , _jsxDEV(Line, { type: "monotone", dataKey: "balance", stroke: "hsl(var(--chart-balance))", strokeWidth: 2.5, dot: false,}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 40}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 37}, this)
  );
}
