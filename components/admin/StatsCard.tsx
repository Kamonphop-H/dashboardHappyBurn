/** @format */

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export default function StatsCard({ title, value, icon, color, change, trend }: StatsCardProps) {
  const colorClasses = {
    primary: "bg-[var(--nkt-primary)] text-white",
    success: "bg-[var(--nkt-success)] text-white",
    warning: "bg-[var(--nkt-warning)] text-white",
    danger: "bg-[var(--nkt-danger)] text-white",
    accent: "bg-[var(--nkt-accent)] text-white",
    secondary: "bg-[var(--nkt-secondary)] text-white",
  };

  const trendIcon = trend === "up" ? "fa-arrow-up" : trend === "down" ? "fa-arrow-down" : "fa-minus";
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600";

  return (
    <div className='bg-white rounded-xl shadow-sm border border-[var(--nkt-border)] p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center justify-between mb-4'>
        <div
          className={`w-12 h-12 ${
            colorClasses[color as keyof typeof colorClasses]
          } rounded-lg flex items-center justify-center`}
        >
          <i className={`fas ${icon} text-xl`}></i>
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${trendColor} text-sm font-medium`}>
            <i className={`fas ${trendIcon} text-xs`}></i>
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className='text-[var(--nkt-muted)] text-sm mb-1'>{title}</p>
        <p className='text-2xl font-bold text-[var(--nkt-text)]'>{value}</p>
      </div>
    </div>
  );
}
