"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/features/auth/api";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { loginSchema, type LoginSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/authStore";

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginSchema) => {
    const tokens = await authApi.login(values);
    localStorage.setItem("lumohub_access_token", tokens.access_token);
    const user = await authApi.me();
    setAuth({ user, accessToken: tokens.access_token, refreshToken: tokens.refresh_token });
    router.push("/dashboard");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div><label>Email</label><Input {...register("email")} placeholder="admin@lumohub.local" />{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}</div>
      <div><label>Mật khẩu</label><Input {...register("password")} type="password" placeholder="••••••••" />{errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}</div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}</Button>
    </form>
  );
}
