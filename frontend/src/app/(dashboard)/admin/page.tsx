import Link from "next/link";

export default function AdminPage() {
  return <div className="space-y-4"><h1 className="section-title">Admin</h1><div className="grid gap-4 md:grid-cols-2"><Link href="/admin/users" className="card">Quản lý người dùng</Link><Link href="/admin/logs" className="card">Xem log hệ thống</Link></div></div>;
}
