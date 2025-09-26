/** @format */
"use client";
import { useEffect, useState } from "react";

export default function MonitoringPage() {
  const [s, setS] = useState<any>(null);
  useEffect(() => {
    fetch("/api/monitor/status", { cache: "no-store" })
      .then((r) => r.json())
      .then(setS);
  }, []);
  return (
    <main className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Sync & Monitoring</h1>
      {!s ? (
        "กำลังโหลด…"
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          <div className='p-4 rounded-2xl bg-white shadow border'>
            Rows (Logs): <b>{s.sheets_rows}</b>
          </div>
          <div className='p-4 rounded-2xl bg-white shadow border'>
            Sheets latency: <b>{s.latency_ms} ms</b>
          </div>
          <div className='p-4 rounded-2xl bg-white shadow border'>
            /healthz:{" "}
            <a className='underline' href='/api/healthz' target='_blank'>
              ตรวจ
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
