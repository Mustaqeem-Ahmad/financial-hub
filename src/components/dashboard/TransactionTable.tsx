import { useState, useMemo } from "react";
import { useAppContext, type Transaction } from "@/context/AppContext";
import { formatCurrency, formatDate, CATEGORIES } from "@/lib/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Pencil, Plus, Search } from "lucide-react";
import TransactionForm from "./TransactionForm";

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

/** Full-width transactions table with filters, sorting, and CRUD */
export default function TransactionTable() {
  const { transactions, role } = useAppContext();

  // Filter state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Sort state
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);

  // Derived filtered & sorted list
  const filtered = useMemo(() => {
    let list = [...transactions];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all") {
      list = list.filter((t) => t.category === categoryFilter);
    }

    if (dateFrom) list = list.filter((t) => t.date >= dateFrom);
    if (dateTo) list = list.filter((t) => t.date <= dateTo);

    // Sort
    list.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortKey === "date") return mul * a.date.localeCompare(b.date);
      return mul * (a.amount - b.amount);
    });

    return list;
  }, [transactions, search, categoryFilter, dateFrom, dateTo, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function openEdit(txn: Transaction) {
    setEditingTxn(txn);
    setFormOpen(true);
  }

  function openAdd() {
    setEditingTxn(null);
    setFormOpen(true);
  }

  return (
    <div id="transactions" className="space-y-4">
      {/* Filter bar — stacks on mobile */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search transactions"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[160px]" aria-label="Filter by category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="flex-1 sm:w-[140px]"
            aria-label="Date from"
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="flex-1 sm:w-[140px]"
            aria-label="Date to"
          />
        </div>

        {/* Admin-only Add button */}
        {role === "admin" && (
          <Button onClick={openAdd} size="sm" className="gap-1 w-full sm:w-auto" aria-label="Add transaction">
            <Plus className="h-4 w-4" /> Add
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button onClick={() => toggleSort("date")} className="flex items-center gap-1 hover:text-foreground">
                  Date <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead>
                <button onClick={() => toggleSort("amount")} className="flex items-center gap-1 hover:text-foreground">
                  Amount <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              {role === "admin" && <TableHead className="w-10" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={role === "admin" ? 6 : 5} className="text-center text-muted-foreground py-8">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="text-sm whitespace-nowrap">{formatDate(txn.date)}</TableCell>
                  <TableCell className="text-sm font-medium max-w-[150px] truncate">{txn.description}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">
                      {txn.category}
                    </span>
                  </TableCell>
                  <TableCell className={`text-sm font-mono font-medium whitespace-nowrap ${txn.type === "income" ? "text-success" : "text-destructive"}`}>
                    {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`text-xs font-medium capitalize ${txn.type === "income" ? "text-success" : "text-destructive"}`}>
                      {txn.type}
                    </span>
                  </TableCell>
                  {role === "admin" && (
                    <TableCell>
                      <button
                        onClick={() => openEdit(txn)}
                        className="rounded p-1 hover:bg-accent"
                        aria-label={`Edit ${txn.description}`}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Transaction form modal */}
      <TransactionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        editTransaction={editingTxn}
      />
    </div>
  );
}
