/** @format */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  employee_id: string;
  full_name: string;
  dept?: string;
  group_type?: string;
  status?: string;
  last_login_at?: string;
  account_created?: string;
  steps_sum: number;
  kcal_sum: number;
  days_over_7000: number;
  credits_this_week?: number;
};

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const url = new URL("/api/users/search", window.location.origin);
    if (q) url.searchParams.set("query", q);
    if (from) url.searchParams.set("from", from);
    if (to) url.searchParams.set("to", to);
    const j = await fetch(url.toString(), { cache: "no-store" }).then((r) => r.json());
    setItems(j.items || []);
    setLoading(false);
  };

  useEffect(() => {}, []);

  return (
    <main className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>ค้นหา & รายชื่อผู้ใช้</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
        <input
          className='rounded-xl px-3 py-2 border'
          placeholder='ชื่อ / รหัสพนง. / อีเมล'
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          type='date'
          className='rounded-xl px-3 py-2 border'
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type='date'
          className='rounded-xl px-3 py-2 border'
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button className='rounded-xl px-3 py-2 bg-[var(--nkt-accent)] text-white' onClick={search}>
          ค้นหา
        </button>
      </div>

      {loading ? (
        <div>กำลังค้นหา…</div>
      ) : (
        <div className='overflow-auto'>
          <table className='min-w-full text-sm'>
            <thead>
              <tr className='text-left'>
                <th className='p-2'>รหัสพนง.</th>
                <th className='p-2'>ชื่อ</th>
                <th className='p-2'>แผนก/กลุ่ม</th>
                <th className='p-2'>สถานะ</th>
                <th className='p-2'>ก้าวรวม</th>
                <th className='p-2'>kcal</th>
                <th className='p-2'>วัน ≥7,000</th>
                <th className='p-2'>เครดิต(สัปดาห์)</th>
                <th className='p-2'></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.employee_id} className='border-t'>
                  <td className='p-2'>{it.employee_id}</td>
                  <td className='p-2'>{it.full_name}</td>
                  <td className='p-2'>
                    {it.dept} {it.group_type ? `• ${it.group_type}` : ""}
                  </td>
                  <td className='p-2'>{it.status}</td>
                  <td className='p-2'>{it.steps_sum}</td>
                  <td className='p-2'>{it.kcal_sum}</td>
                  <td className='p-2'>{it.days_over_7000}</td>
                  <td className='p-2'>{it.credits_this_week ?? "-"}</td>
                  <td className='p-2'>
                    <Link
                      className='underline text-[var(--nkt-accent)]'
                      href={`/admin/users/${it.employee_id}`}
                    >
                      ดูรายละเอียด
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
