/** @format */
"use client";
import { useEffect, useState } from "react";

type Summary = {
  totals: {
    users_total: number;
    users_active_today: number;
    logs_today: number;
    steps_today: number;
    kcal_today: number;
  };
  data_quality: { new_rows_today: number; new_photos_today: number };
  suspicious: { high: number; med: number; low: number; pending: number };
  credits: { days_over_7000_today: number };
};

export default function DashboardPage() {
  const [data, setData] = useState<Summary | null>(null);
  useEffect(() => {
    fetch("/api/dashboard/summary")
      .then((r) => r.json())
      .then(setData);
  }, []);
  if (!data) return <div className='p-4'>กำลังโหลด…</div>;

  const Card = ({ title, value }: { title: string; value: any }) => (
    <div className='p-4 rounded-2xl bg-white shadow border border-black/5'>
      <div className='text-sm opacity-70'>{title}</div>
      <div className='text-2xl font-bold mt-1'>{value}</div>
    </div>
  );

  return (
    <main className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Global Dashboard</h1>
      <section className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        <Card title='ผู้ใช้ทั้งหมด' value={data.totals.users_total} />
        <Card title='Active วันนี้' value={data.totals.users_active_today} />
        <Card title='Logs วันนี้' value={data.totals.logs_today} />
        <Card title='ก้าวรวมวันนี้' value={data.totals.steps_today} />
        <Card title='kcal รวมวันนี้' value={data.totals.kcal_today} />
        <Card title='แถวใหม่วันนี้' value={data.data_quality.new_rows_today} />
        <Card title='รูปใหม่วันนี้' value={data.data_quality.new_photos_today} />
        <Card title='วัน ≥7,000 วันนี้' value={data.credits.days_over_7000_today} />
      </section>
    </main>
  );
}
