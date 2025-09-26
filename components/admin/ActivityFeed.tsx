/** @format */

interface Activity {
  id: string;
  type: "user" | "flag" | "system" | "achievement";
  message: string;
  time: string;
  user?: string;
  severity?: "low" | "medium" | "high";
}

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities = [] }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return "fa-user";
      case "flag":
        return "fa-flag";
      case "system":
        return "fa-cog";
      case "achievement":
        return "fa-trophy";
      default:
        return "fa-info-circle";
    }
  };

  const getColor = (type: string, severity?: string) => {
    if (type === "flag") {
      switch (severity) {
        case "high":
          return "text-red-600 bg-red-100";
        case "medium":
          return "text-orange-600 bg-orange-100";
        default:
          return "text-yellow-600 bg-yellow-100";
      }
    }
    switch (type) {
      case "user":
        return "text-blue-600 bg-blue-100";
      case "system":
        return "text-gray-600 bg-gray-100";
      case "achievement":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Mock data if no activities provided
  const mockActivities: Activity[] = [
    {
      id: "1",
      type: "flag",
      message: "พบการบันทึกก้าวผิดปกติ",
      time: "5 นาทีที่แล้ว",
      user: "EMP001",
      severity: "high",
    },
    {
      id: "2",
      type: "user",
      message: "ผู้ใช้ใหม่ลงทะเบียน",
      time: "15 นาทีที่แล้ว",
      user: "EMP002",
    },
    {
      id: "3",
      type: "achievement",
      message: "บรรลุเป้าหมาย 7,000 ก้าว",
      time: "30 นาทีที่แล้ว",
      user: "EMP003",
    },
    {
      id: "4",
      type: "system",
      message: "ระบบ sync ข้อมูลสำเร็จ",
      time: "1 ชั่วโมงที่แล้ว",
    },
  ];

  const displayActivities = activities.length > 0 ? activities : mockActivities;

  return (
    <div className='bg-white rounded-xl shadow-sm border border-[var(--nkt-border)] p-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-[var(--nkt-text)]'>Recent Activity</h3>
        <button className='text-sm text-[var(--nkt-primary)] hover:underline'>View All</button>
      </div>
      <div className='space-y-3 max-h-[400px] overflow-y-auto'>
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getColor(
                activity.type,
                activity.severity
              )}`}
            >
              <i className={`fas ${getIcon(activity.type)} text-xs`}></i>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm text-[var(--nkt-text)] font-medium'>{activity.message}</p>
              {activity.user && <p className='text-xs text-[var(--nkt-muted)] mt-1'>User: {activity.user}</p>}
              <p className='text-xs text-gray-400 mt-1'>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
