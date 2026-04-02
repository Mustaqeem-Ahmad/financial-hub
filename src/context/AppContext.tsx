import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Category } from "@/lib/helpers";

// --- Types ---
export type UserRole = "viewer" | "admin";
export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: Category;
  amount: number;
  type: TransactionType;
}

interface AppState {
  transactions: Transaction[];
  role: UserRole;
  setRole: (role: UserRole) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, t: Omit<Transaction, "id">) => void;
}

const AppContext = createContext<AppState | null>(null);

// --- Seed data: 12 months of realistic transactions ---
function generateSeedData(): Transaction[] {
  const data: Transaction[] = [];
  const now = new Date();

  const incomeDescs = ["Monthly Salary", "Freelance Project", "Investment Return"];
  const expenseDescs: [string, Category][] = [
    ["Grocery Shopping", "Food & Dining"],
    ["Gas Station", "Transportation"],
    ["Electric Bill", "Utilities"],
    ["Netflix Subscription", "Entertainment"],
    ["Rent Payment", "Housing"],
    ["Doctor Visit", "Healthcare"],
    ["Amazon Order", "Shopping"],
    ["Restaurant Dinner", "Food & Dining"],
    ["Uber Ride", "Transportation"],
  ];

  let id = 1;

  // Generate transactions for each of the last 12 months
  for (let m = 11; m >= 0; m--) {
    const month = new Date(now.getFullYear(), now.getMonth() - m, 1);

    // 1-2 income entries per month
    data.push({
      id: String(id++),
      date: new Date(month.getFullYear(), month.getMonth(), 1).toISOString().split("T")[0],
      description: "Monthly Salary",
      category: "Salary",
      amount: 5200 + Math.round(Math.random() * 800),
      type: "income",
    });

    if (Math.random() > 0.5) {
      data.push({
        id: String(id++),
        date: new Date(month.getFullYear(), month.getMonth(), 15).toISOString().split("T")[0],
        description: incomeDescs[1 + Math.floor(Math.random() * 2)],
        category: Math.random() > 0.5 ? "Freelance" : "Investments",
        amount: 500 + Math.round(Math.random() * 2000),
        type: "income",
      });
    }

    // 3-5 expense entries per month
    const numExpenses = 3 + Math.floor(Math.random() * 3);
    for (let e = 0; e < numExpenses; e++) {
      const [desc, cat] = expenseDescs[Math.floor(Math.random() * expenseDescs.length)];
      data.push({
        id: String(id++),
        date: new Date(month.getFullYear(), month.getMonth(), 2 + Math.floor(Math.random() * 26)).toISOString().split("T")[0],
        description: desc,
        category: cat,
        amount: 20 + Math.round(Math.random() * 980),
        type: "expense",
      });
    }
  }

  return data.sort((a, b) => b.date.localeCompare(a.date));
}

// --- Provider ---
export function AppProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(generateSeedData);
  const [role, setRole] = useState<UserRole>("admin");

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...t, id: String(Date.now()) },
      ...prev,
    ]);
  }, []);

  const updateTransaction = useCallback((id: string, t: Omit<Transaction, "id">) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...t, id } : tx))
    );
  }, []);

  return (
    <AppContext.Provider value={{ transactions, role, setRole, addTransaction, updateTransaction }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
