/** @format */

"use client";
export default function EvidenceFilters({ filters, onChange }: any) {
  return (
    <div className='flex flex-wrap gap-3'>
      <input
        type='date'
        className='border rounded px-3 py-2'
        value={filters.from}
        onChange={(e) => onChange((f: any) => ({ ...f, from: e.target.value }))}
      />
      <input
        type='date'
        className='border rounded px-3 py-2'
        value={filters.to}
        onChange={(e) => onChange((f: any) => ({ ...f, to: e.target.value }))}
      />
      <input
        className='border rounded px-3 py-2'
        placeholder='รหัสพนง.'
        value={filters.userId}
        onChange={(e) => onChange((f: any) => ({ ...f, userId: e.target.value }))}
      />
    </div>
  );
}
