/** @format */

"use client";
export default function FlagsStats({ stats }: { stats: any }) {
  const Box = ({ t, v, color }: any) => (
    <div className={`p-4 rounded-lg text-white ${color}`}>
      {t}: <b>{v}</b>
    </div>
  );
  return (
    <div className='grid grid-cols-3 gap-3'>
      <Box t='HIGH' v={stats?.high || 0} color='bg-red-500' />
      <Box t='MED' v={stats?.med || 0} color='bg-amber-500' />
      <Box t='LOW' v={stats?.low || 0} color='bg-green-500' />
    </div>
  );
}
