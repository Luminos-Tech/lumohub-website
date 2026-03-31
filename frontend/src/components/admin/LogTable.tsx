"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/features/admin/api";

type LogItem = { id: number; user_id?: number | null; action: string; target_type?: string | null; target_id?: number | null; details?: string | null; ip_address?: string | null; created_at: string; };

export function LogTable() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  useEffect(() => { adminApi.listLogs().then(setLogs); }, []);
  return (
    <div className="card overflow-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead><tr className="border-b border-slate-200"><th className="p-3">ID</th><th className="p-3">Action</th><th className="p-3">Target</th><th className="p-3">Details</th><th className="p-3">Created</th></tr></thead>
        <tbody>{logs.map((log) => <tr key={log.id} className="border-b border-slate-100"><td className="p-3">{log.id}</td><td className="p-3">{log.action}</td><td className="p-3">{log.target_type}#{log.target_id}</td><td className="p-3">{log.details || "-"}</td><td className="p-3">{new Date(log.created_at).toLocaleString()}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
