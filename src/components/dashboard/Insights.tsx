import { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { formatCurrency, percentChange } from "@/lib/helpers";
import { TrendingUp, TrendingDown, ShoppingBag, CalendarDays } from "lucide-react";

/** Simple insights section showing key spending stats */
export default function Insights() {
  const { transactions } = useAppContext();

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthKey = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`;

    const thisMonthExpenses = transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(thisMonthKey))
      .reduce((s, t) => s + t.amount, 0);

    const lastMonthExpenses = transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(lastMonthKey))
      .reduce((s, t) => s + t.amount, 0);

    // Top spending category
    const catMap: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      });
    const topCategory = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];

    const totalTransactions = transactions.length;

    return {
      thisMonthExpenses,
      lastMonthExpenses,
      expenseChange: percentChange(thisMonthExpenses, lastMonthExpenses),
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      totalTransactions,
    };
  }, [transactions]);

  const cards = [
    {
      icon: ShoppingBag,
      title: "Top Spending Category",
      value: stats.topCategory?.name ?? "N/A",
      sub: stats.topCategory ? formatCurrency(stats.topCategory.amount) + " total" : "",
    },
    {
      icon: stats.expenseChange <= 0 ? TrendingDown : TrendingUp,
      title: "Expenses This Month",
      value: formatCurrency(stats.thisMonthExpenses),
      sub: `${stats.expenseChange >= 0 ? "+" : ""}${stats.expenseChange}% vs last month`,
    },
    {
      icon: CalendarDays,
      title: "Total Transactions",
      value: String(stats.totalTransactions),
      sub: "across all time",
    },
  ];

  return (
    <div id="insights" className="space-y-3">
      <h3 className="text-sm font-semibold">Insights</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm animate-fade-in"
          >
            <div className="rounded-lg bg-accent p-2">
              <card.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.title}</p>
              <p className="text-lg font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
