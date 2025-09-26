/** @format */

"use client";
export default function DataQuality({ data }: { data: any }) {
  const Row = ({ k, v }: any) => (
    <div className='flex justify-between py-1'>
      <span className='text-[var(--nkt-muted)]'>{k}</span>
      <span className='font-semibold'>{v}</span>
    </div>
  );
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-[var(--nkt-border)]'>
      <div className='text-lg font-semibold mb-3'>Data Quality</div>
      <Row k='แถวใหม่วันนี้' v={data.new_rows_today} />
      <Row k='รูปใหม่วันนี้' v={data.new_photos_today} />
      <Row k='Error rate' v={`${data.error_rate || 0}%`} />
    </div>
  );
}
