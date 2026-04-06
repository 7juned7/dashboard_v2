"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { exportToCSV } from "@/utils/helpers";

export default function TransactionTable() {
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);
  const transactions = useFinanceStore((s) => s.transactions);
  const filter = useFinanceStore((s) => s.filter);
  const search = useFinanceStore((s) => s.search);
  const setFilter = useFinanceStore((s) => s.setFilter);
  const setSearch = useFinanceStore((s) => s.setSearch);
  const role = useFinanceStore((s) => s.role);

  const filteredTransactions = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );

  return (
  <div className="card space-y-5">

    {/* 🔝 Controls */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent border border-[var(--border)] px-4 py-2.5 rounded-lg w-full lg:w-80 outline-none text-sm"
      />

      {/* 🎛 Controls Right */}
      <div className="flex flex-wrap items-center gap-2">

        <button
          onClick={() => setFilter("all")}
          className="btn text-sm"
        >
          All
        </button>

        <button
          onClick={() => setFilter("income")}
          className="btn btn-success text-sm"
        >
          Income
        </button>

        <button
          onClick={() => setFilter("expense")}
          className="btn btn-danger text-sm"
        >
          Expense
        </button>

        <div className="h-5 w-px bg-[var(--border)] mx-1" />

        <button
          onClick={() => exportToCSV(filteredTransactions)}
          className="btn btn-primary text-sm"
        >
          Export
        </button>

        {role === "admin" && <AddButton />}
      </div>
    </div>

    {/* 📋 Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">

        {/* Header */}
        <thead>
          <tr className="text-secondary border-b border-[var(--border)] text-xs uppercase tracking-wide">
            <th className="py-3 text-left font-medium">Date</th>
            <th className="text-left font-medium">Category</th>
            <th className="text-right font-medium">Amount</th>
            <th className="text-left font-medium">Type</th>
            <th className="text-right font-medium">Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-[var(--border)] hover:bg-[var(--card)] transition"
              >
                <td className="py-4">{t.date}</td>

                <td className="font-medium">{t.category}</td>

                <td className="text-right font-medium">
                  ₹ {Number(t.amount).toLocaleString()}
                </td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t.type === "income"
                        ? "bg-[var(--success)]/10 text-[var(--success)]"
                        : "bg-[var(--danger)]/10 text-[var(--danger)]"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="text-right">
                  {role === "admin" && (
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="text-xs text-[var(--danger)] hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-secondary">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

// ➕ Add Button
function AddButton() {
  const setOpen = useFinanceStore((s) => s.setModalOpen);

  return (
    <button
      onClick={() => setOpen(true)}
      className="btn btn-primary"
    >
      + Add
    </button>
  );
}