import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/helpers";
import { useAppContext } from "@/context/AppContext";

export default function TransactionForm({ open, onClose, editTransaction }) {
  const { addTransaction, updateTransaction } = useAppContext();

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    if (editTransaction) {
      setDate(editTransaction.date);
      setDescription(editTransaction.description);
      setCategory(editTransaction.category);
      setAmount(String(editTransaction.amount));
      setType(editTransaction.type);
    } else {
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
      setCategory("Other");
      setAmount("");
      setType("expense");
    }
  }, [editTransaction, open]);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { date, description, category, amount: Number(amount), type };

    if (editTransaction) {
      updateTransaction(editTransaction.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editTransaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="txn-date">Date</Label>
            <Input id="txn-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="txn-desc">Description</Label>
            <Input id="txn-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Coffee at Blue Bottle" required />
          </div>

          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger aria-label="Select category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="txn-amount">Amount ($)</Label>
            <Input id="txn-amount" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
          </div>

          <div className="space-y-1.5">
            <Label>Type</Label>
            <div className="flex gap-4">
              {["income", "expense"].map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="txn-type" value={t} checked={type === t} onChange={() => setType(t)} className="accent-primary" />
                  <span className="capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{editTransaction ? "Save Changes" : "Add Transaction"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
