/** @format */

"use client";
import { useState } from "react";

export default function UserProfile({ user }: { user: any }) {
  const [patch, setPatch] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/users/${user.employee_id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ patch, reason: "admin_edit", admin: "web-admin" }),
    });
    setSaving(false);
    location.reload();
  };

  return (
    <div className='bg-white rounded-xl border border-[var(--nkt-border)] p-6 space-y-2'>
      <div className='text-lg font-semibold mb-2'>โปรไฟล์</div>
      <div className='text-sm'>แผนก: {user.dept}</div>
      <div className='text-sm'>กลุ่ม: {user.group_type}</div>
      <div className='text-sm'>สถานะ: {user.status}</div>
      <div className='text-sm'>อีเมล: {user.email || "-"}</div>
      <div className='text-sm'>สร้างเมื่อ: {user.account_created || "-"}</div>
      <div className='text-sm'>ล็อกอินล่าสุด: {user.last_login_at || "-"}</div>

      <div className='mt-3 grid gap-2'>
        <input
          className='border rounded px-3 py-2'
          placeholder='ชื่อใหม่'
          onChange={(e) => setPatch((p: any) => ({ ...p, full_name: e.target.value }))}
        />
        <input
          className='border rounded px-3 py-2'
          placeholder='แผนกใหม่'
          onChange={(e) => setPatch((p: any) => ({ ...p, dept: e.target.value }))}
        />
        <input
          className='border rounded px-3 py-2'
          placeholder='กลุ่มใหม่'
          onChange={(e) => setPatch((p: any) => ({ ...p, group_type: e.target.value }))}
        />
        <input
          className='border rounded px-3 py-2'
          placeholder='สถานะใหม่'
          onChange={(e) => setPatch((p: any) => ({ ...p, status: e.target.value }))}
        />
        <button
          onClick={save}
          disabled={saving}
          className='px-3 py-2 rounded bg-[var(--nkt-primary)] text-white'
        >
          {saving ? "กำลังบันทึก…" : "บันทึกการแก้ไข (Audit)"}
        </button>
      </div>
    </div>
  );
}
