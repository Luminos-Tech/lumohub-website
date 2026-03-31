export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="page-shell flex min-h-screen items-center justify-center p-6"><div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">{children}</div></main>;
}
