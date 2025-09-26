/** @format */

"use client";
export default function UserFilters({ filters, onChange }: any) {
  return (
    <div className='flex flex-wrap gap-3'>
      <select
        className='border rounded-lg px-3 py-2'
        value={filters.status}
        onChange={(e) => onChange((f: any) => ({ ...f, status: e.target.value }))}
      >
        <option value=''>ทุกสถานะ</option>
        <option value='success'>success</option>
        <option value='inactive'>inactive</option>
      </select>
      <input
        className='border rounded-lg px-3 py-2'
        placeholder='แผนก'
        value={filters.department}
        onChange={(e) => onChange((f: any) => ({ ...f, department: e.target.value }))}
      />
    </div>
  );
}
