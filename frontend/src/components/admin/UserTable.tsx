"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/features/admin/api";
import type { User } from "@/types/user";
import { RoleBadge } from "./RoleBadge";
import { Button } from "@/components/common/Button";

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const load = async () => setUsers(await adminApi.listUsers());
  useEffect(() => { void load(); }, []);
  return (
    <div className="card overflow-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead><tr className="border-b border-slate-200"><th className="p-3">Tên</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Trạng thái</th><th className="p-3">Thao tác</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-slate-100">
              <td className="p-3">{user.full_name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3"><RoleBadge role={user.role} /></td>
              <td className="p-3">{user.is_active ? "Active" : "Locked"}</td>
              <td className="p-3 flex gap-2">
                {user.is_active ? <Button variant="danger" onClick={async () => { await adminApi.lockUser(user.id); await load(); }}>Khóa</Button> : <Button variant="secondary" onClick={async () => { await adminApi.unlockUser(user.id); await load(); }}>Mở</Button>}
                <Button variant="secondary" onClick={async () => { await adminApi.updateRole(user.id, user.role === "admin" ? "user" : "admin"); await load(); }}>Đổi role</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
