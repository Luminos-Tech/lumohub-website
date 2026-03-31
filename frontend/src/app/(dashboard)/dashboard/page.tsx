import { CalendarView } from "@/components/calendar/CalendarView";
import { NotificationList } from "@/components/notifications/NotificationList";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Dashboard</h1>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <CalendarView />
        <div><NotificationList /></div>
      </div>
    </div>
  );
}
