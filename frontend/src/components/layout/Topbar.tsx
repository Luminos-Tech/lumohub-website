"use client";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useLogout } from "@/features/auth/hooks";
import { Button } from "@/components/common/Button";

export function Topbar() {
  const logout = useLogout();
  return (
    <div className="mb-6 flex items-center justify-end gap-3">
      <NotificationBell />
      <Button variant="secondary" onClick={() => void logout()}>Đăng xuất</Button>
    </div>
  );
}
