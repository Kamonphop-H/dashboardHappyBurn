/** @format */

"use client";
export default function StatsGrid({ data }: { data: any }) {
  const Card = ({ t, v }: any) => (
    <div className='bg-white rounded-xl shadow-sm p-5 border border-[var(--nkt-border)] card-hover'>
      <div className='text-sm text-[var(--nkt-muted)]'>{t}</div>
      <div className='text-2xl font-bold mt-1'>{v}</div>
    </div>
  );
  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
      <Card t='ผู้ใช้ทั้งหมด' v={data.users_total} />
      <Card t='Active วันนี้' v={data.users_active_today} />
      <Card t='บันทึกวันนี้' v={data.logs_today} />
      <Card t='ก้าวรวมวันนี้' v={data.steps_today} />
      <Card t='kcal รวมวันนี้' v={data.kcal_today} />
    </div>
  );
}
