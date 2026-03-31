import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center p-6">
      <div className="card max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">LumoHub</h1>
        <p className="mb-6 text-slate-600">Hệ thống quản lý lịch, event, reminder, notification và kết nối LUMO.</p>
        <div className="flex justify-center gap-3">
          <Link href="/login" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Đăng nhập</Link>
          <Link href="/register" className="rounded-xl border border-slate-300 px-4 py-2">Đăng ký</Link>
        </div>
      </div>
    </main>
  );
}
