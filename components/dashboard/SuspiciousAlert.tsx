/** @format */

"use client";
import Link from "next/link";
export default function SuspiciousAlert({ suspicious }: { suspicious: any }) {
  return (
    <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between'>
      <div className='text-yellow-800'>
        พบเคสที่น่าสงสัย: <b>HIGH {suspicious.high}</b> • <b>MED {suspicious.med}</b> • LOW {suspicious.low}
      </div>
      <Link href='/admin/flags' className='px-3 py-2 rounded-lg bg-yellow-600 text-white'>
        ดูรายละเอียด
      </Link>
    </div>
  );
}
