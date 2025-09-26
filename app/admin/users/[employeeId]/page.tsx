/** @format */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function User360Page() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [patch, setPatch] = useState<{
    full_name?: string;
    dept?: string;
    group_type?: string;
    status?: string;
  }>({});

  useEffect(() => {
    fetch(`/api/users/${employeeId}/detail`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setData);
  }, [employeeId]);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/users/${employeeId}/edit`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ patch, reason: "admin_edit", admin: "web-admin" }),
    });
    setSaving(false);
    fetch(`/api/users/${employeeId}/detail`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setData);
  };

  if (!data) return <div className='p-4'>กำลังโหลด…</div>;
  const p = data.profile || {};

  return (
    <main className='p-4 space-y-6'>
      <h1 className='text-2xl font-bold'>
        User 360° – {p.full_name} ({p.employee_id})
      </h1>

      <section className='grid md:grid-cols-3 gap-4'>
        <div className='p-4 rounded-2xl bg-white shadow border'>
          <h2 className='font-semibold mb-2'>โปรไฟล์</h2>
          <div className='space-y-1 text-sm'>
            <div>แผนก: {p.dept || "-"}</div>
            <div>กลุ่ม: {p.group_type || "-"}</div>
            <div>สถานะ: {p.status || "-"}</div>
            <div>อีเมล: {p.email || "-"}</div>
            <div>สร้างเมื่อ: {p.account_created || "-"}</div>
            <div>ล็อกอินล่าสุด: {p.last_login_at || "-"}</div>
          </div>
          <div className='mt-3 space-y-2'>
            <input
              className='w-full border rounded px-3 py-2'
              placeholder='ชื่อใหม่'
              onChange={(e) => setPatch((s) => ({ ...s, full_name: e.target.value }))}
            />
            <input
              className='w-full border rounded px-3 py-2'
              placeholder='แผนกใหม่'
              onChange={(e) => setPatch((s) => ({ ...s, dept: e.target.value }))}
            />
            <input
              className='w-full border rounded px-3 py-2'
              placeholder='กลุ่มใหม่'
              onChange={(e) => setPatch((s) => ({ ...s, group_type: e.target.value }))}
            />
            <input
              className='w-full border rounded px-3 py-2'
              placeholder='สถานะใหม่'
              onChange={(e) => setPatch((s) => ({ ...s, status: e.target.value }))}
            />
            <button
              className='px-3 py-2 rounded bg-[var(--nkt-accent)] text-white'
              onClick={save}
              disabled={saving}
            >
              {saving ? "กำลังบันทึก…" : "บันทึกการแก้ไข (Audit)"}
            </button>
          </div>
        </div>

        <div className='p-4 rounded-2xl bg-white shadow border'>
          <h2 className='font-semibold mb-2'>สถิติช่วงที่เลือก</h2>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div className='p-3 rounded bg-black/5'>
              Logs: <b>{data.stats.logs_count}</b>
            </div>
            <div className='p-3 rounded bg-black/5'>
              ก้าวรวม: <b>{data.stats.steps_sum}</b>
            </div>
            <div className='p-3 rounded bg-black/5'>
              kcal รวม: <b>{data.stats.kcal_sum}</b>
            </div>
            <div className='p-3 rounded bg-black/5'>
              วัน ≥7,000: <b>{data.stats.days_over_7000}</b>
            </div>
          </div>
        </div>

        <div className='p-4 rounded-2xl bg-white shadow border'>
          <h2 className='font-semibold mb-2'>เครดิต/Flags</h2>
          <div className='text-sm'>เครดิตล่าสุด: {data.credits?.at(-1)?.credits ?? "-"}</div>
          <div className='text-sm mt-2'>Flags: {data.flags?.length ?? 0}</div>
        </div>
      </section>

      <section className='p-4 rounded-2xl bg-white shadow border'>
        <h2 className='font-semibold mb-2'>ไทม์ไลน์กิจกรรม (ล่าสุด)</h2>
        <div className='overflow-auto'>
          <table className='min-w-full text-sm'>
            <thead>
              <tr className='text-left'>
                <th className='p-2'>วันที่</th>
                <th className='p-2'>ก้าว</th>
                <th className='p-2'>kcal</th>
                <th className='p-2'>หลักฐาน</th>
              </tr>
            </thead>
            <tbody>
              {data.logs
                ?.slice(-50)
                .reverse()
                .map((r: any, i: number) => (
                  <tr key={i} className='border-t'>
                    <td className='p-2'>{r.date}</td>
                    <td className='p-2'>{r.steps}</td>
                    <td className='p-2'>{r.kcal}</td>
                    <td className='p-2'>
                      {r.photo_file_id ? (
                        <img
                          className='w-12 h-12 rounded object-cover inline-block'
                          src={`/api/admin/uploads/${r.photo_file_id}/media`}
                          alt=''
                        />
                      ) : r.photo_url ? (
                        <img
                          className='w-12 h-12 rounded object-cover inline-block'
                          src={r.photo_url}
                          alt=''
                        />
                      ) : (
                        <span className='text-xs opacity-60'>ไม่มีรูป</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
