/** @format */

"use client";
export default function LoadingSpinner({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div
      className={
        fullScreen ? "min-h-[60vh] flex items-center justify-center" : "p-6 flex items-center justify-center"
      }
    >
      <div className='animate-spin rounded-full h-10 w-10 border-4 border-[var(--nkt-primary)] border-t-transparent'></div>
    </div>
  );
}
