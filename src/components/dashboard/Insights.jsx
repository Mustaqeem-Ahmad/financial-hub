const _jsxFileName = "src/components/dashboard/Insights.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useMemo } from "react";
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
    const catMap = {};
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
      value: _nullishCoalesce(_optionalChain([stats, 'access', _ => _.topCategory, 'optionalAccess', _2 => _2.name]), () => ( "N/A")),
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
    _jsxDEV('div', { id: "insights", className: "space-y-3", children: [
      _jsxDEV('h3', { className: "text-sm font-semibold" , children: "Insights"}, void 0, false, {fileName: _jsxFileName, lineNumber: 67}, this)
      , _jsxDEV('div', { className: "grid gap-3 sm:grid-cols-3"  , children: 
        cards.map((card) => (
          _jsxDEV('div', {

            className: "flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm animate-fade-in"        ,
 children: [
            _jsxDEV('div', { className: "rounded-lg bg-accent p-2"  , children: 
              _jsxDEV(card.icon, { className: "h-4 w-4 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this )
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 74}, this)
            , _jsxDEV('div', { children: [
              _jsxDEV('p', { className: "text-xs text-muted-foreground" , children: card.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 78}, this)
              , _jsxDEV('p', { className: "text-lg font-bold" , children: card.value}, void 0, false, {fileName: _jsxFileName, lineNumber: 79}, this)
              , _jsxDEV('p', { className: "text-xs text-muted-foreground" , children: card.sub}, void 0, false, {fileName: _jsxFileName, lineNumber: 80}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 77}, this)
          ]}, card.title, true, {fileName: _jsxFileName, lineNumber: 70}, this)
        ))
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 68}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 66}, this)
  );
}
