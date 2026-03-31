"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/calendar", label: "Lịch" },
  { href: "/events", label: "Sự kiện" },
  { href: "/notifications", label: "Thông báo" },
  { href: "/settings", label: "Cài đặt" },
  { href: "/admin", label: "Admin" }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="min-h-screen w-64 border-r border-slate-200 bg-white p-4">
      <div className="mb-6 text-2xl font-bold">{APP_NAME}</div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={cn("block rounded-xl px-3 py-2 text-sm", pathname.startsWith(item.href) ? "bg-blue-600 text-white" : "hover:bg-slate-100")}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
