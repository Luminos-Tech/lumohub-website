import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Đăng ký</h1>
      <p className="mb-6 text-slate-500">Tạo tài khoản mới cho LumoHub.</p>
      <RegisterForm />
      <p className="mt-4 text-sm text-slate-500">Đã có tài khoản? <Link href="/login" className="text-blue-600">Đăng nhập</Link></p>
    </div>
  );
}
