import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CompletionRateList from "@/components/bookshelf/CompletionRateList";

export default function Calendar() {
  const MOCK_EVENTS = [
    { date: "2025-10-01", status: "done" },
    { date: "2025-10-02", status: "done" },
    { date: "2025-10-04", status: "done" },
    { date: "2025-10-05", status: "done" },
    { date: "2025-10-06", status: "done" },
    { date: "2025-10-07", status: "done" },
    { date: "2025-10-08", status: "done" },
    { date: "2025-10-09", status: "done" },
    { date: "2025-10-10", status: "rest" },
    { date: "2025-10-11", status: "rest" },
    { date: "2025-10-12", status: "rest" },
    { date: "2025-10-13", status: "done" },
    { date: "2025-10-30", status: "highlight" }, // 範例：當天高亮背景
  ];

  const renderEventContent = (eventInfo) => {
    const status = eventInfo.event.extendedProps.status;

    if (status === "done") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <span class="material-symbols-outlined">check_circle</span>
        </div>
      );
    }
    if (status === "rest") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <span class="material-symbols-outlined">airline_seat_flat</span>
        </div>
      );
    }
    return null;
  };

  const getDayClassNames = (arg) => {
    // 簡單模擬：如果是 2025-10-30 給個特殊背景色 class
    if (arg.dateStr === "2025-10-30") return ["bg-warining"];
    return [];
  };

  const cycles = [
    {
      title: "本週達成率",
      type: "week",
      completedUnit: 3,
      totalUnit: 7,
    },
    {
      title: "本月達成率",
      type: "month",
      completedUnit: 20,
      totalUnit: 31,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate="2025-10-01"
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next", // 對應圖中的 < >
          }}
          locale="zh-tw"
          // 將我們的模擬資料轉換成 FullCalendar 看得懂的 event 格式
          events={MOCK_EVENTS.map((e) => ({
            start: e.date,
            display: "background", // 讓它不佔據空間，方便我們自定義
            extendedProps: { status: e.status },
          }))}
          // 重要：使用 eventContent 來渲染圖示
          eventContent={renderEventContent}
          // 讓事件充滿整個格子
          dayMaxEvents={false}
          // 高度自適應
          contentHeight="auto"
          // 週末標示 (可選)
          firstDay={1} // 週一開始
        />
      </div>
      <CompletionRateList cycles={cycles} />
    </>
  );
}
