const _jsxFileName = "src/components/dashboard/TransactionTable.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useState, useMemo } from "react";
import { useAppContext, } from "@/context/AppContext";
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




/** Full-width transactions table with filters, sorting, and CRUD */
export default function TransactionTable() {
  const { transactions, role } = useAppContext();

  // Filter state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Sort state
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);

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

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function openEdit(txn) {
    setEditingTxn(txn);
    setFormOpen(true);
  }

  function openAdd() {
    setEditingTxn(null);
    setFormOpen(true);
  }

  return (
    _jsxDEV('div', { id: "transactions", className: "space-y-4", children: [
      /* Filter bar — stacks on mobile */
      _jsxDEV('div', { className: "flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"      , children: [
        _jsxDEV('div', { className: "relative flex-1 min-w-0"  , children: [
          _jsxDEV(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 99}, this )
          , _jsxDEV(Input, {
            placeholder: "Search transactions…" ,
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            'aria-label': "Search transactions" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 100}, this
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 98}, this)

        , _jsxDEV(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
          _jsxDEV(SelectTrigger, { className: "w-full sm:w-[160px]" , 'aria-label': "Filter by category"  , children: 
            _jsxDEV(SelectValue, { placeholder: "Category",}, void 0, false, {fileName: _jsxFileName, lineNumber: 111}, this )
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 110}, this)
          , _jsxDEV(SelectContent, { children: [
            _jsxDEV(SelectItem, { value: "all", children: "All Categories" }, void 0, false, {fileName: _jsxFileName, lineNumber: 114}, this)
            , CATEGORIES.map((c) => (
              _jsxDEV(SelectItem, { value: c, children: 
                c
              }, c, false, {fileName: _jsxFileName, lineNumber: 116}, this)
            ))
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 113}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 109}, this)

        , _jsxDEV('div', { className: "flex gap-2" , children: [
          _jsxDEV(Input, {
            type: "date",
            value: dateFrom,
            onChange: (e) => setDateFrom(e.target.value),
            className: "flex-1 sm:w-[140px]" ,
            'aria-label': "Date from" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 124}, this
          )
          , _jsxDEV(Input, {
            type: "date",
            value: dateTo,
            onChange: (e) => setDateTo(e.target.value),
            className: "flex-1 sm:w-[140px]" ,
            'aria-label': "Date to" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 123}, this)

        /* Admin-only Add button */
        , role === "admin" && (
          _jsxDEV(Button, { onClick: openAdd, size: "sm", className: "gap-1 w-full sm:w-auto"  , 'aria-label': "Add transaction" , children: [
            _jsxDEV(Plus, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 143}, this ), " Add"
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 142}, this)
        )
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 97}, this)

      /* Table */
      , _jsxDEV('div', { className: "rounded-xl border bg-card shadow-sm overflow-x-auto"    , children: 
        _jsxDEV(Table, { children: [
          _jsxDEV(TableHeader, { children: 
            _jsxDEV(TableRow, { children: [
              _jsxDEV(TableHead, { children: 
                _jsxDEV('button', { onClick: () => toggleSort("date"), className: "flex items-center gap-1 hover:text-foreground"   , children: ["Date "
                   , _jsxDEV(ArrowUpDown, { className: "h-3 w-3" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 155}, this )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 154}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 153}, this)
              , _jsxDEV(TableHead, { children: "Description"}, void 0, false, {fileName: _jsxFileName, lineNumber: 158}, this)
              , _jsxDEV(TableHead, { className: "hidden sm:table-cell" , children: "Category"}, void 0, false, {fileName: _jsxFileName, lineNumber: 159}, this)
              , _jsxDEV(TableHead, { children: 
                _jsxDEV('button', { onClick: () => toggleSort("amount"), className: "flex items-center gap-1 hover:text-foreground"   , children: ["Amount "
                   , _jsxDEV(ArrowUpDown, { className: "h-3 w-3" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 162}, this )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 161}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 160}, this)
              , _jsxDEV(TableHead, { className: "hidden md:table-cell" , children: "Type"}, void 0, false, {fileName: _jsxFileName, lineNumber: 165}, this)
              , role === "admin" && _jsxDEV(TableHead, { className: "w-10",}, void 0, false, {fileName: _jsxFileName, lineNumber: 166}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 152}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this)
          , _jsxDEV(TableBody, { children: 
            filtered.length === 0 ? (
              _jsxDEV(TableRow, { children: 
                _jsxDEV(TableCell, { colSpan: role === "admin" ? 6 : 5, className: "text-center text-muted-foreground py-8"  , children: "No transactions found."

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 172}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 171}, this)
            ) : (
              filtered.map((txn) => (
                _jsxDEV(TableRow, { children: [
                  _jsxDEV(TableCell, { className: "text-sm whitespace-nowrap" , children: formatDate(txn.date)}, void 0, false, {fileName: _jsxFileName, lineNumber: 179}, this)
                  , _jsxDEV(TableCell, { className: "text-sm font-medium max-w-[150px] truncate"   , children: txn.description}, void 0, false, {fileName: _jsxFileName, lineNumber: 180}, this)
                  , _jsxDEV(TableCell, { className: "hidden sm:table-cell" , children: 
                    _jsxDEV('span', { className: "inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium"      , children: 
                      txn.category
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 182}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 181}, this)
                  , _jsxDEV(TableCell, { className: `text-sm font-mono font-medium whitespace-nowrap ${txn.type === "income" ? "text-success" : "text-destructive"}`, children: [
                    txn.type === "income" ? "+" : "-", formatCurrency(txn.amount)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 186}, this)
                  , _jsxDEV(TableCell, { className: "hidden md:table-cell" , children: 
                    _jsxDEV('span', { className: `text-xs font-medium capitalize ${txn.type === "income" ? "text-success" : "text-destructive"}`, children: 
                      txn.type
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 190}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 189}, this)
                  , role === "admin" && (
                    _jsxDEV(TableCell, { children: 
                      _jsxDEV('button', {
                        onClick: () => openEdit(txn),
                        className: "rounded p-1 hover:bg-accent"  ,
                        'aria-label': `Edit ${txn.description}`,
 children: 
                        _jsxDEV(Pencil, { className: "h-3.5 w-3.5 text-muted-foreground"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 201}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 196}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 195}, this)
                  )
                ]}, txn.id, true, {fileName: _jsxFileName, lineNumber: 178}, this)
              ))
            )
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 169}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 150}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 149}, this)

      /* Transaction form modal */
      , _jsxDEV(TransactionForm, {
        open: formOpen,
        onClose: () => setFormOpen(false),
        editTransaction: editingTxn,}, void 0, false, {fileName: _jsxFileName, lineNumber: 213}, this
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 95}, this)
  );
}
