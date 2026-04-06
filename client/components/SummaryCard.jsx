"use client";

import { useFinanceStore } from "@/store/useFinanceStore";

export default function SummaryCard() {
  const transactions = useFinanceStore((state) => state.transactions);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const cards = [
    { title: "Balance", value: balance, color: "bg-blue-600" },
    { title: "Income", value: income, color: "bg-green-600" },
    { title: "Expenses", value: expenses, color: "bg-red-600" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
  {cards.map((card, i) => (
    <div key={i} className="card hover:bg-gray-800 transition">
      
      <p className="text-secondary text-sm">{card.title}</p>

      <h2 className="text-2xl font-semibold mt-1">
        ₹ {card.value.toLocaleString()}
      </h2>

      <p className="text-xs text-secondary mt-1">
        Updated just now
      </p>
    </div>
  ))}
</div>
  );
}