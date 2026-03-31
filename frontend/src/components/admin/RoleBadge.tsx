export function RoleBadge({ role }: { role: string }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{role}</span>;
}
