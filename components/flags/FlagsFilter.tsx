/** @format */

"use client";
export default function FlagsFilter({ filters, onChange }: any) {
  return (
    <div className='flex flex-wrap gap-3'>
      <select
        className='border rounded px-3 py-2'
        value={filters.severity}
        onChange={(e) => onChange((f: any) => ({ ...f, severity: e.target.value }))}
      >
        <option value=''>ทุกระดับ</option>
        <option value='LOW'>LOW</option>
        <option value='MED'>MED</option>
        <option value='HIGH'>HIGH</option>
      </select>
      <select
        className='border rounded px-3 py-2'
        value={filters.status}
        onChange={(e) => onChange((f: any) => ({ ...f, status: e.target.value }))}
      >
        <option value=''>ทุกสถานะ</option>
        <option value='pending'>pending</option>
        <option value='closed'>closed</option>
      </select>
    </div>
  );
}
