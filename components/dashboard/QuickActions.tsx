/** @format */

"use client";
import Link from "next/link";
export default function QuickActions() {
  const Btn = ({ href, label }: any) => (
    <Link
      href={href}
      className='px-3 py-2 rounded-lg bg-[var(--nkt-primary)] text-white hover:bg-[var(--nkt-primary-dark)] text-sm'
    >
      {label}
    </Link>
  );
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-[var(--nkt-border)] flex flex-wrap gap-2'>
      <Btn href='/admin/flags' label='เคสส่อโกงด่วน' />
      <Btn href='/admin/evidence' label='ผู้ใช้ที่ไม่มีรูป' />
      <Btn href='/admin/users' label='ผู้ใช้ไม่เคลื่อนไหว 7 วัน' />
    </div>
  );
}
