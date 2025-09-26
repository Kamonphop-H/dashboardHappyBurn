/** @format */
"use client";
import { useEffect, useState } from "react";

export default function EvidencePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const url = new URL("/api/evidence/list", window.location.origin);
    if (from) url.searchParams.set("from", from);
    if (to) url.searchParams.set("to", to);
    const j = await fetch(url.toString(), { cache: "no-store" }).then((r) => r.json());
    setItems(j.items || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Evidence Viewer</h1>
      <div className='flex gap-2'>
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
        <button className='rounded-xl px-3 py-2 bg-[var(--nkt-accent)] text-white' onClick={load}>
          โหลด
        </button>
      </div>
      {loading ? (
        <div>กำลังโหลด…</div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-6 gap-3'>
          {items.map((x, i) => (
            <div key={i} className='p-2 rounded-xl bg-white shadow border text-xs'>
              <img className='w-full h-24 object-cover rounded mb-1' src={x.thumb} alt='' />
              <div>{x.employee_id}</div>
              <div className='opacity-70'>{x.log_date}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
