/** @format */

"use client";
export default function UserFlags({ flags }: { flags: any[] }) {
  return (
    <div className='bg-white rounded-xl border border-[var(--nkt-border)] p-6'>
      <div className='text-lg font-semibold mb-3'>Flags</div>
      {!flags?.length ? (
        <div className='opacity-60 text-sm'>ไม่มีรายการ</div>
      ) : (
        <ul className='space-y-2 text-sm'>
          {flags.map((f: any, i: number) => (
            <li key={i} className='border p-2 rounded'>
              {f.rule || f[1]} • {f.severity || f[2]} • {f.date || f[4]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
