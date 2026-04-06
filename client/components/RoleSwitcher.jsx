"use client";

import { useFinanceStore } from "@/store/useFinanceStore";

export default function RoleSwitcher() {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  return (
   <div className="flex border border-[var(--border)] rounded-lg overflow-hidden">
  <button
    onClick={() => setRole("viewer")}
    className={`px-3 py-2 text-sm ${
      role === "viewer" ? "bg-[var(--card)]" : ""
    }`}
  >
    Viewer
  </button>

  <button
    onClick={() => setRole("admin")}
    className={`px-3 py-2 text-sm ${
      role === "admin" ? "bg-[var(--card)]" : ""
    }`}
  >
    Admin
  </button>
</div>
  );
}