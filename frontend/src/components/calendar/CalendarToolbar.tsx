import { Button } from "@/components/common/Button";

export function CalendarToolbar({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div><h2 className="text-xl font-bold">Lịch sự kiện</h2><p className="text-sm text-slate-500">Xem lịch theo ngày / tuần / tháng</p></div>
      <Button onClick={onCreate}>Tạo event</Button>
    </div>
  );
}
