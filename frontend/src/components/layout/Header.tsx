"use client";
import { useAuthStore } from "@/store/authStore";

export function Header() {
  const user = useAuthStore((s) => s.user);
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <div className="text-sm text-slate-500">Xin chào</div>
        <div className="text-lg font-bold">{user?.full_name || "Người dùng"}</div>
      </div>
      <div className="text-sm text-slate-500">{user?.role || "guest"}</div>
    </div>
  );
}
