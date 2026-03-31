"use client";
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Topbar } from "./Topbar";

export function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar />
        <Header />
        {children}
      </main>
    </div>
  );
}
