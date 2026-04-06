import { useMemo } from "react";
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
    <div className="flex-1 flex flex-col min-h-screen min-w-0">
      <Header />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div id="dashboard" className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <SummaryCard title="Total Balance" value={summary.balance} trend={summary.balanceTrend} icon={Wallet} />
          <SummaryCard title="Total Income" value={summary.totalIncome} trend={summary.incomeTrend} icon={TrendingUp} variant="income" />
          <SummaryCard title="Total Expenses" value={summary.totalExpenses} trend={summary.expenseTrend} icon={TrendingDown} variant="expense" />
        </div>

        <div id="charts" className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
          <BalanceChart />
          <CategoryChart />
        </div>

        <TransactionTable />
        <Insights />
      </main>
    </div>
  );
}

export default function Index() {
  return (
    <AppProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <DashboardContent />
        </div>
      </SidebarProvider>
    </AppProvider>
  );
}
