/** @format */

"use client";
import Link from "next/link";

export default function UserTable({ users, pagination, onSort, onPageChange }: any) {
  return (
    <div className='overflow-auto bg-white rounded-xl border border-[var(--nkt-border)]'>
      <table className='min-w-full text-sm'>
        <thead>
          <tr className='text-left'>
            {[
              "employee_id",
              "full_name",
              "dept",
              "group_type",
              "status",
              "steps_sum",
              "kcal_sum",
              "days_over_7000",
              "credits_this_week",
            ].map((k) => (
              <th key={k} className='p-2 cursor-pointer' onClick={() => onSort(k)}>
                {k}
              </th>
            ))}
            <th className='p-2' />
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.employee_id} className='border-t'>
              <td className='p-2'>{u.employee_id}</td>
              <td className='p-2'>{u.full_name}</td>
              <td className='p-2'>{u.dept}</td>
              <td className='p-2'>{u.group_type}</td>
              <td className='p-2'>{u.status}</td>
              <td className='p-2'>{u.steps_sum}</td>
              <td className='p-2'>{u.kcal_sum}</td>
              <td className='p-2'>{u.days_over_7000}</td>
              <td className='p-2'>{u.credits_this_week}</td>
              <td className='p-2'>
                <Link className='text-[var(--nkt-primary)] underline' href={`/admin/users/${u.employee_id}`}>
                  ดูรายละเอียด
                </Link>
              </td>
            </tr>
          ))}
          {!users?.length && (
            <tr>
              <td className='p-3 text-center opacity-60' colSpan={10}>
                ไม่พบข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='p-3 flex justify-end gap-2'>
        <button
          onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
          className='px-3 py-1 border rounded'
        >
          ก่อนหน้า
        </button>
        <div className='px-3 py-1'>หน้า {pagination.page}</div>
        <button onClick={() => onPageChange(pagination.page + 1)} className='px-3 py-1 border rounded'>
          ถัดไป
        </button>
      </div>
    </div>
  );
}
