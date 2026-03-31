import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Đăng nhập</h1>
      <p className="mb-6 text-slate-500">Đăng nhập để quản lý lịch và sự kiện.</p>
      <LoginForm />
      <p className="mt-4 text-sm text-slate-500">Chưa có tài khoản? <Link href="/register" className="text-blue-600">Đăng ký</Link></p>
    </div>
  );
}
