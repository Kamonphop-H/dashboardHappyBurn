/** @format */

"use client";
export default function ErrorBoundary({ error, retry, children }: any) {
  if (error) {
    return (
      <div className='p-6 bg-red-50 border border-red-200 rounded-xl'>
        <div className='font-semibold text-red-700 mb-2'>เกิดข้อผิดพลาด</div>
        <pre className='text-sm text-red-700/80 whitespace-pre-wrap'>{String(error.message || error)}</pre>
        {retry && (
          <button className='mt-3 px-3 py-2 bg-red-600 text-white rounded' onClick={retry}>
            ลองใหม่
          </button>
        )}
      </div>
    );
  }
  return children;
}
