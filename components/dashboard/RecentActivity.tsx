/** @format */

"use client";
export default function RecentActivity({ activities = [] as any[] }) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-[var(--nkt-border)]'>
      <div className='text-lg font-semibold mb-3'>Recent Logs</div>
      <div className='space-y-2 text-sm max-h-[320px] overflow-auto'>
        {activities.slice(0, 12).map((a: any, i: number) => (
          <div key={i} className='flex justify-between border-b last:border-0 pb-2'>
            <div>{a.employee_id}</div>
            <div className='opacity-70'>{a.date}</div>
            <div className='font-medium'>{a.steps} steps</div>
          </div>
        ))}
        {!activities?.length && <div className='opacity-60'>ไม่มีข้อมูล</div>}
      </div>
    </div>
  );
}
