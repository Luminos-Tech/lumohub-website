"use client";
import { ReactNode } from "react";

type Props = { open: boolean; title: string; onClose: () => void; children: ReactNode; };

export function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose}>Đóng</button>
        </div>
        {children}
      </div>
    </div>
  );
}
