/** @format */

"use client";
export default function UserActivity({ activities }: { activities: any[] }) {
  return (
    <div className='bg-white rounded-xl border border-[var(--nkt-border)] p-6'>
      <div className='text-lg font-semibold mb-3'>กิจกรรมล่าสุด</div>
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
            {activities?.slice(0, 50).map((r: any, i: number) => (
              <tr key={i} className='border-t'>
                <td className='p-2'>{r.date}</td>
                <td className='p-2'>{r.steps}</td>
                <td className='p-2'>{r.kcal}</td>
                <td className='p-2'>
                  {r.photo_file_id ? (
                    <img
                      className='w-10 h-10 object-cover rounded'
                      src={`/api/admin/uploads/${r.photo_file_id}/media`}
                    />
                  ) : r.photo_url ? (
                    <img className='w-10 h-10 object-cover rounded' src={r.photo_url} />
                  ) : (
                    <span className='opacity-60 text-xs'>ไม่มีรูป</span>
                  )}
                </td>
              </tr>
            ))}
            {!activities?.length && (
              <tr>
                <td className='p-3 text-center opacity-60' colSpan={4}>
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
