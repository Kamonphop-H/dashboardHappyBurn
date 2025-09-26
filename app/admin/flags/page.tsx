/** @format */
"use client";
import { useEffect, useState } from "react";

export default function FlagsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [recalc, setRecalc] = useState(false);
  const load = async () => {
    const j = await fetch("/api/flags/list", { cache: "no-store" }).then((r) => r.json());
    setItems(j.items || []);
  };
  useEffect(() => {
    load();
  }, []);
  const recompute = async () => {
    setRecalc(true);
    await fetch("/api/flags/recompute", { method: "POST" });
    setRecalc(false);
    load();
  };

  return (
    <main className='p-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Anti-Cheat Flags</h1>
        <button
          className='rounded-xl px-3 py-2 bg-[var(--nkt-accent)] text-white'
          onClick={recompute}
          disabled={recalc}
        >
          {recalc ? "กำลังคำนวณ…" : "Recompute"}
        </button>
      </div>
      <div className='overflow-auto'>
        <table className='min-w-full text-sm'>
          <thead>
            <tr className='text-left'>
              <th className='p-2'>เวลา</th>
              <th className='p-2'>กฎ</th>
              <th className='p-2'>ระดับ</th>
              <th className='p-2'>พนักงาน</th>
              <th className='p-2'>วันที่</th>
              <th className='p-2'>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x: any, i: number) => (
              <tr key={i} className='border-t'>
                <td className='p-2'>{x.timestamp || x.created_at || "-"}</td>
                <td className='p-2'>{x.rule || x[1]}</td>
                <td className='p-2'>{x.severity || x[2]}</td>
                <td className='p-2'>{x.employee_id || x[3]}</td>
                <td className='p-2'>{x.date || x[4]}</td>
                <td className='p-2'>{x.details || x[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
