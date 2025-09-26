/** @format */

"use client";
export default function EvidenceGrid({ evidence, onSelect }: any) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-6 gap-3'>
      {evidence?.map((x: any, i: number) => (
        <button
          key={i}
          onClick={() => onSelect(x)}
          className='p-2 bg-white rounded-xl border border-[var(--nkt-border)]'
        >
          {x.thumb ? (
            <img src={x.thumb} className='w-full h-24 object-cover rounded mb-1' />
          ) : (
            <div className='w-full h-24 bg-black/10 rounded mb-1'></div>
          )}
          <div className='text-xs'>{x.employee_id}</div>
          <div className='text-xs opacity-70'>{x.date}</div>
        </button>
      ))}
      {!evidence?.length && <div className='opacity-60'>ไม่มีรูป</div>}
    </div>
  );
}
