import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  const styles = {
    primary: "bg-blue-600 text-white border-blue-600",
    secondary: "bg-white text-slate-900 border-slate-200",
    danger: "bg-red-600 text-white border-red-600"
  };
  return (
    <button className={cn("rounded-xl border px-4 py-2 text-sm font-semibold cursor-pointer", styles[variant], className)} {...props} />
  );
}
