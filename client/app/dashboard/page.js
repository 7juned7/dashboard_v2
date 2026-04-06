"use client";

import { useEffect } from "react";

import SummaryCard from "@/components/SummaryCard";
import Charts from "@/components/Charts";
import TransactionTable from "@/components/TransactionTable";
import RoleSwitcher from "@/components/RoleSwitcher";
import Insights from "@/components/Insights";
import AddTransactionModal from "@/components/AddTransactionModal";
import ThemeToggle from "@/components/ThemeToggle";

import { useFinanceStore } from "@/store/useFinanceStore";
import { transactions } from "@/data/mockData";

export default function Dashboard() {
  const setTransactions = useFinanceStore((s) => s.setTransactions);
  const transactionsState = useFinanceStore((s) => s.transactions);

  // ✅ Load mock data only once
  useEffect(() => {
    if (transactionsState.length === 0) {
      setTransactions(transactions);
    }
  }, [transactionsState, setTransactions]);

  return (
    <div className="min-h-screen p-6 space-y-6">
      
      {/* 🔝 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-secondary">
            Overview of your financial activity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <RoleSwitcher />
        </div>
      </div>

      {/* 💳 Summary */}
      <SummaryCard />

      {/* 📊 Charts */}
      <Charts />

      {/* 📋 Transactions */}
      <TransactionTable />

      {/* 💡 Insights */}
      <Insights />

      {/* ➕ Modal */}
      <AddTransactionModal />
    </div>
  );
}