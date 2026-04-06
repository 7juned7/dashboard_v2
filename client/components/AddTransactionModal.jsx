"use client";

import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function AddTransactionModal() {
  const { modalOpen, setModalOpen, addTransaction } = useFinanceStore();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  if (!modalOpen) return null;

  const handleSubmit = () => {
    if (!form.amount || !form.category || !form.date) return;

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setModalOpen(false);
    setForm({ amount: "", category: "", type: "expense", date: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      
      {/* Modal */}
      <div className="card w-80 space-y-4">
        
        <h2 className="text-lg font-semibold">Add Transaction</h2>

        {/* Amount */}
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full p-2 rounded-lg border border-[var(--border)] bg-transparent outline-none"
        />

        {/* Category */}
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 rounded-lg border border-[var(--border)] bg-transparent outline-none"
        />

        {/* Date */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full p-2 rounded-lg border border-[var(--border)] bg-transparent outline-none"
        />

        {/* Type */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full p-2 rounded-lg border border-[var(--border)] bg-transparent outline-none"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => setModalOpen(false)}
            className="btn"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}