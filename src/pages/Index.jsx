const _jsxFileName = "src/pages/Index.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppProvider, useAppContext } from "@/context/AppContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Header from "@/components/dashboard/Header";
import SummaryCard from "@/components/dashboard/SummaryCard";
import BalanceChart from "@/components/dashboard/BalanceChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import TransactionTable from "@/components/dashboard/TransactionTable";
import Insights from "@/components/dashboard/Insights";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { percentChange } from "@/lib/helpers";

/** Main dashboard content — uses AppContext for data */
function DashboardContent() {
  const { transactions } = useAppContext();

  const summary = useMemo(() => {
    const now = new Date();
    const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastKey = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`;

    const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    const thisIncome = transactions.filter((t) => t.type === "income" && t.date.startsWith(thisKey)).reduce((s, t) => s + t.amount, 0);
    const lastIncome = transactions.filter((t) => t.type === "income" && t.date.startsWith(lastKey)).reduce((s, t) => s + t.amount, 0);

    const thisExpenses = transactions.filter((t) => t.type === "expense" && t.date.startsWith(thisKey)).reduce((s, t) => s + t.amount, 0);
    const lastExpenses = transactions.filter((t) => t.type === "expense" && t.date.startsWith(lastKey)).reduce((s, t) => s + t.amount, 0);

    return {
      balance,
      totalIncome,
      totalExpenses,
      incomeTrend: percentChange(thisIncome, lastIncome),
      expenseTrend: percentChange(thisExpenses, lastExpenses),
      balanceTrend: percentChange(thisIncome - thisExpenses, lastIncome - lastExpenses),
    };
  }, [transactions]);

  return (
    _jsxDEV('div', { className: "flex-1 flex flex-col min-h-screen min-w-0"    , children: [
      _jsxDEV(Header, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 46}, this )
      , _jsxDEV('main', { className: "flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6"      , children: [
        /* Summary cards — 1 col on mobile, 3 on sm+ */
        _jsxDEV('div', { id: "dashboard", className: "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3"    , children: [
          _jsxDEV(SummaryCard, { title: "Total Balance" , value: summary.balance, trend: summary.balanceTrend, icon: Wallet,}, void 0, false, {fileName: _jsxFileName, lineNumber: 50}, this )
          , _jsxDEV(SummaryCard, { title: "Total Income" , value: summary.totalIncome, trend: summary.incomeTrend, icon: TrendingUp, variant: "income",}, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this )
          , _jsxDEV(SummaryCard, { title: "Total Expenses" , value: summary.totalExpenses, trend: summary.expenseTrend, icon: TrendingDown, variant: "expense",}, void 0, false, {fileName: _jsxFileName, lineNumber: 52}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 49}, this)

        /* Charts — stack on mobile, side by side on lg */
        , _jsxDEV('div', { id: "charts", className: "grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2"    , children: [
          _jsxDEV(BalanceChart, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this )
          , _jsxDEV(CategoryChart, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 58}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 56}, this)

        , _jsxDEV(TransactionTable, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 61}, this )
        , _jsxDEV(Insights, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this )
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 47}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 45}, this)
  );
}

/** Index page wraps everything in providers */
export default function Index() {
  return (
    _jsxDEV(AppProvider, { children: 
      _jsxDEV(SidebarProvider, { children: 
        _jsxDEV('div', { className: "min-h-screen flex w-full"  , children: [
          _jsxDEV(DashboardSidebar, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 74}, this )
          , _jsxDEV(DashboardContent, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 73}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 72}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 71}, this)
  );
}
