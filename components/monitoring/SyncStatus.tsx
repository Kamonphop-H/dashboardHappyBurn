/** @format */

"use client";
export default function SyncStatus({ data }: { data: any }) {
  return (
    <div className='bg-white rounded-xl border p-6'>
      <div className='font-semibold mb-2'>Sync Status</div>
      <div className='text-sm'>
        Logs rows: <b>{data?.logs_rows || 0}</b>
      </div>
      <div className='text-sm opacity-70'>Last run: {data?.last_run}</div>
    </div>
  );
}
