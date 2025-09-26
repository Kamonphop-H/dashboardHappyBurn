/** @format */

"use client";
export default function UserStats({ stats }: { stats: any }) {
  const Box = ({ t, v }: any) => (
    <div className='p-4 rounded-lg bg-black/5'>
      {t}: <b>{v}</b>
    </div>
  );
  return (
    <div className='bg-white rounded-xl border border-[var(--nkt-border)] p-6'>
      <div className='text-lg font-semibold mb-3'>สถิติ</div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        <Box t='Logs' v={stats.logs_count} />
        <Box t='ก้าวรวม' v={stats.steps_sum} />
        <Box t='kcal รวม' v={stats.kcal_sum} />
        <Box t='วัน ≥ 7,000' v={stats.days_over_7000} />
      </div>
    </div>
  );
}
