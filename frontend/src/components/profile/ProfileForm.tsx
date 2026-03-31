"use client";
import { useEffect, useState } from "react";
import { profileApi } from "@/features/profile/api";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

export function ProfileForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    profileApi.me().then((data) => {
      setFullName(data.full_name);
      setPhone(data.phone || "");
    });
  }, []);

  const save = async () => {
    await profileApi.update({ full_name: fullName, phone });
    alert("Đã lưu hồ sơ");
  };

  return (
    <div className="card space-y-4">
      <div><label>Họ tên</label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
      <div><label>Số điện thoại</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      <Button onClick={() => void save()}>Lưu hồ sơ</Button>
    </div>
  );
}
