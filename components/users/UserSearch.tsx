/** @format */

"use client";
import { useState } from "react";
export default function UserSearch({ onSearch }: { onSearch: (f: any) => void }) {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
      <input
        className='border rounded-lg px-3 py-2'
        placeholder='ชื่อ / รหัสพนง. / อีเมล'
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <input
        type='date'
        className='border rounded-lg px-3 py-2'
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type='date'
        className='border rounded-lg px-3 py-2'
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button
        className='px-4 py-2 bg-[var(--nkt-primary)] text-white rounded-lg'
        onClick={() => onSearch((f: any) => ({ ...f, query: q, from, to }))}
      >
        ค้นหา
      </button>
    </div>
  );
}
