const _jsxFileName = "src/components/dashboard/TransactionForm.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useState, useEffect } from "react";
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
import { CATEGORIES, } from "@/lib/helpers";
import { useAppContext, } from "@/context/AppContext";







/** Modal form to add or edit a transaction */
export default function TransactionForm({ open, onClose, editTransaction }) {
  const { addTransaction, updateTransaction } = useAppContext();

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  // Pre-fill form when editing
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
    const payload = {
      date,
      description,
      category,
      amount: Number(amount),
      type,
    };

    if (editTransaction) {
      updateTransaction(editTransaction.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  }

  return (
    _jsxDEV(Dialog, { open: open, onOpenChange: (v) => !v && onClose(), children: 
      _jsxDEV(DialogContent, { className: "sm:max-w-md", children: [
        _jsxDEV(DialogHeader, { children: 
          _jsxDEV(DialogTitle, { children: editTransaction ? "Edit Transaction" : "Add Transaction"}, void 0, false, {fileName: _jsxFileName, lineNumber: 76}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this)

        , _jsxDEV('form', { onSubmit: handleSubmit, className: "space-y-4 pt-2" , children: [
          /* Date */
          _jsxDEV('div', { className: "space-y-1.5", children: [
            _jsxDEV(Label, { htmlFor: "txn-date", children: "Date"}, void 0, false, {fileName: _jsxFileName, lineNumber: 82}, this)
            , _jsxDEV(Input, {
              id: "txn-date",
              type: "date",
              value: date,
              onChange: (e) => setDate(e.target.value),
              required: true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 83}, this
            )
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 81}, this)

          /* Description */
          , _jsxDEV('div', { className: "space-y-1.5", children: [
            _jsxDEV(Label, { htmlFor: "txn-desc", children: "Description"}, void 0, false, {fileName: _jsxFileName, lineNumber: 94}, this)
            , _jsxDEV(Input, {
              id: "txn-desc",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "e.g. Coffee at Blue Bottle"    ,
              required: true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 95}, this
            )
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 93}, this)

          /* Category */
          , _jsxDEV('div', { className: "space-y-1.5", children: [
            _jsxDEV(Label, { children: "Category"}, void 0, false, {fileName: _jsxFileName, lineNumber: 106}, this)
            , _jsxDEV(Select, { value: category, onValueChange: (v) => setCategory(v ), children: [
              _jsxDEV(SelectTrigger, { 'aria-label': "Select category" , children: 
                _jsxDEV(SelectValue, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 109}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 108}, this)
              , _jsxDEV(SelectContent, { children: 
                CATEGORIES.map((c) => (
                  _jsxDEV(SelectItem, { value: c, children: 
                    c
                  }, c, false, {fileName: _jsxFileName, lineNumber: 113}, this)
                ))
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 111}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 107}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 105}, this)

          /* Amount */
          , _jsxDEV('div', { className: "space-y-1.5", children: [
            _jsxDEV(Label, { htmlFor: "txn-amount", children: "Amount ($)" }, void 0, false, {fileName: _jsxFileName, lineNumber: 123}, this)
            , _jsxDEV(Input, {
              id: "txn-amount",
              type: "number",
              min: "0.01",
              step: "0.01",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              placeholder: "0.00",
              required: true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 124}, this
            )
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 122}, this)

          /* Type radio */
          , _jsxDEV('div', { className: "space-y-1.5", children: [
            _jsxDEV(Label, { children: "Type"}, void 0, false, {fileName: _jsxFileName, lineNumber: 138}, this)
            , _jsxDEV('div', { className: "flex gap-4" , children: 
              (["income", "expense"] ).map((t) => (
                _jsxDEV('label', { className: "flex items-center gap-2 cursor-pointer text-sm"    , children: [
                  _jsxDEV('input', {
                    type: "radio",
                    name: "txn-type",
                    value: t,
                    checked: type === t,
                    onChange: () => setType(t),
                    className: "accent-primary",}, void 0, false, {fileName: _jsxFileName, lineNumber: 142}, this
                  )
                  , _jsxDEV('span', { className: "capitalize", children: t}, void 0, false, {fileName: _jsxFileName, lineNumber: 150}, this)
                ]}, t, true, {fileName: _jsxFileName, lineNumber: 141}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 139}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 137}, this)

          , _jsxDEV('div', { className: "flex justify-end gap-2 pt-2"   , children: [
            _jsxDEV(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 157}, this)
            , _jsxDEV(Button, { type: "submit", children: 
              editTransaction ? "Save Changes" : "Add Transaction"
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 160}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 156}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 79}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 74}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 73}, this)
  );
}
