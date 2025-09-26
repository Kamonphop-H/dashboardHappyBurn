/** @format */

"use client";
export default function PerformanceMetrics({ data }: { data: any }) {
  return (
    <div className='bg-white rounded-xl border p-6'>
      <div className='font-semibold mb-2'>Performance</div>
      <div className='text-sm'>
        Sheets latency: <b>{data?.sheets_latency_ms || 0} ms</b>
      </div>
    </div>
  );
}
