/** @format */

"use client";
export default function ErrorLogs({ logs = [] }: { logs: any[] }) {
  return (
    <div className='bg-white rounded-xl border p-6'>
      <div className='font-semibold mb-2'>Errors</div>
      {!logs.length ? (
        <div className='opacity-60 text-sm'>ไม่มีข้อผิดพลาด</div>
      ) : (
        <ul className='text-sm list-disc pl-5 space-y-1'>
          {logs.map((l: any, i: number) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
