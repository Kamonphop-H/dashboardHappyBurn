/** @format */

"use client";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const r = useRouter();
  return (
    <button onClick={() => r.back()} className='px-3 py-2 rounded-lg border hover:bg-black/5'>
      <i className='fas fa-arrow-left mr-2' /> กลับ
    </button>
  );
}
