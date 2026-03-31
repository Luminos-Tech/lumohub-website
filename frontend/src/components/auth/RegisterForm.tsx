"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/features/auth/api";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { registerSchema, type RegisterSchema } from "@/schemas/authSchema";

export function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterSchema) => {
    await authApi.register(values);
    router.push("/login");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div><label>Họ và tên</label><Input {...register("full_name")} placeholder="Trần Văn Hà" />{errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}</div>
      <div><label>Email</label><Input {...register("email")} placeholder="email@example.com" />{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}</div>
      <div><label>Mật khẩu</label><Input {...register("password")} type="password" />{errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}</div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Đang tạo..." : "Đăng ký"}</Button>
    </form>
  );
}
