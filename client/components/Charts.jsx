"use client";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useFinanceStore } from "@/store/useFinanceStore";

export default function Charts() {
  const transactions = useFinanceStore((s) => s.transactions);
  const filter = useFinanceStore((s) => s.filter);
  const search = useFinanceStore((s) => s.search);

  // ✅ Filtering
  const filteredTransactions = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );

  // ✅ Line data
  const data = filteredTransactions.map((t) => ({
    name: t.date,
    amount: t.amount,
  }));

  // ✅ Pie data
  const categoryData = Object.values(
    filteredTransactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, value: 0 };
      }
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      
      {/* 📈 Line Chart */}
      <div className="card">
        <h2 className="text-sm font-medium mb-3">Balance Trend</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="amount"
              stroke="var(--primary)" // ✅ theme color
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Pie Chart */}
      <div className="card">
        <h2 className="text-sm font-medium mb-3">Spending Categories</h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" outerRadius={80}>
              {categoryData.map((_, i) => (
                <Cell
                  key={i}
                  fill={
                    [
                      "var(--primary)",
                      "var(--success)",
                      "var(--danger)",
                    ][i % 3]
                  }
                />
              ))}
            </Pie>

            <Tooltip
  contentStyle={{
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
  }}
  labelStyle={{ color: "var(--text-primary)" }}
  itemStyle={{ color: "var(--text-primary)" }}
/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}