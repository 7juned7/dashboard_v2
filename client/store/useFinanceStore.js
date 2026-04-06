import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFinanceStore = create(
  persist(
    (set) => ({
      // 🔹 State
      role: "viewer",
      transactions: [],
      filter: "all",
      search: "",
      modalOpen: false,

      // 🔹 Role
      setRole: (role) => set({ role }),

      // 🔹 Modal
      setModalOpen: (val) => set({ modalOpen: val }),

      // 🔹 Transactions
      setTransactions: (data) => set({ transactions: data }),

      addTransaction: (txn) =>
        set((state) => ({
          transactions: [
            {
              ...txn,
              id: Date.now(),
              amount: Number(txn.amount),
            },
            ...state.transactions,
          ],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // 🔹 Filters
      setFilter: (filter) => set({ filter }),
      setSearch: (search) => set({ search }),

      resetFilters: () => set({ filter: "all", search: "" }),
    }),
    {
      name: "finance-storage", // 🔥 localStorage key
    }
  )
);