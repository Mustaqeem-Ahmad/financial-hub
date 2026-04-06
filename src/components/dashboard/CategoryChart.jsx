import { useMemo } from "react";
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
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold">Expenses by Category</h3>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Chart */}
        <div className="w-full sm:w-1/2 min-h-[220px]">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  color: "hsl(var(--popover-foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                itemStyle={{
                  color: "hsl(var(--popover-foreground))",
                }}
                labelStyle={{
                  color: "hsl(var(--popover-foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full sm:w-1/2 space-y-2">
          {data.map((item, i) => {
            const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
            return (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="inline-block h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="truncate text-muted-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-medium">{pct}%</span>
                  <span className="text-xs text-muted-foreground w-[70px] text-right">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
