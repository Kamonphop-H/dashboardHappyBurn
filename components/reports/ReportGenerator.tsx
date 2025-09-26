/** @format */

"use client";
export default function ReportGenerator() {
  return (
    <div className='bg-white rounded-xl border p-6'>
      <div className='font-semibold mb-2'>Generate Report</div>
      <div className='opacity-60 text-sm'>*ตัวอย่าง: คุณสามารถเพิ่ม logic สร้าง CSV/PDF ภายหลัง*</div>
      <button className='mt-3 px-3 py-2 rounded bg-[var(--nkt-primary)] text-white'>Generate</button>
    </div>
  );
}
