"use client";

import { useFinanceStore } from "@/store/useFinanceStore";

export default function Insights() {
  const transactions = useFinanceStore((state) => state.transactions);

  const categoryTotals = {};

  transactions.forEach((t) => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += t.amount;
  });

  const highest = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="card">
      <h2 className="text-sm font-medium mb-2">Insights</h2>

      <p className="text-secondary text-sm">
        Highest spending category:{" "}
        <span className="font-medium">
          {highest ? highest[0] : "No data"}
        </span>
      </p>
    </div>
  );
}