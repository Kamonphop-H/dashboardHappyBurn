/** @format */

"use client";
export default function EvidenceViewer({ evidence, onClose }: any) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6'>
      <div className='bg-white rounded-xl max-w-5xl w-full overflow-hidden'>
        <div className='p-3 border-b flex justify-between'>
          <div className='font-semibold'>Evidence – {evidence.employee_id}</div>
          <button onClick={onClose}>
            <i className='fas fa-times' />
          </button>
        </div>
        <div className='p-4'>
          {evidence.view ? (
            <img src={evidence.view} className='w-full max-h-[70vh] object-contain' />
          ) : (
            <div className='h-[60vh] flex items-center justify-center'>ไม่มีภาพ</div>
          )}
        </div>
      </div>
    </div>
  );
}
