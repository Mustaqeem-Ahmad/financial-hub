import { useMemo } from "react";
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
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold">Balance Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="hsl(var(--chart-income))" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-expense))" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="balance" stroke="hsl(var(--chart-balance))" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
