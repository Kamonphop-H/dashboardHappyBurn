/** @format */

"use client";
export default function FlagsList({ flags }: { flags: any[] }) {
  return (
    <div className='bg-white rounded-xl border border-[var(--nkt-border)] overflow-auto'>
      <table className='min-w-full text-sm'>
        <thead>
          <tr className='text-left'>
            <th className='p-2'>เวลา</th>
            <th className='p-2'>กฎ</th>
            <th className='p-2'>ระดับ</th>
            <th className='p-2'>รหัสพนง.</th>
            <th className='p-2'>วันที่</th>
            <th className='p-2'>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {flags?.map((x: any, i: number) => (
            <tr key={i} className='border-t'>
              <td className='p-2'>{x.timestamp || x.created_at || x[0] || "-"}</td>
              <td className='p-2'>{x.rule || x[1]}</td>
              <td className='p-2'>{x.severity || x[2]}</td>
              <td className='p-2'>{x.employee_id || x[3]}</td>
              <td className='p-2'>{x.date || x[4]}</td>
              <td className='p-2'>{x.details || x[5]}</td>
            </tr>
          ))}
          {!flags?.length && (
            <tr>
              <td className='p-3 text-center opacity-60' colSpan={6}>
                ไม่มีรายการ
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
