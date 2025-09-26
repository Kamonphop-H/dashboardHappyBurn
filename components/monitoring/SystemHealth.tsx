/** @format */

"use client";
export default function SystemHealth({ data }: { data: any }) {
  const Item = ({ k, v }: { k: string; v: any }) => (
    <div className='flex justify-between p-3 rounded bg-white border'>
      {k}
      <b>{String(v)}</b>
    </div>
  );
  return (
    <div className='space-y-2'>
      <Item k='API' v={data?.api || "unknown"} />
      <Item k='Sheets' v={data?.sheets || "unknown"} />
    </div>
  );
}
