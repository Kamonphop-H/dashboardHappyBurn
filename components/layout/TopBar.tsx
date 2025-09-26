/** @format */

"use client";
export default function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className='fixed top-0 left-0 right-0 h-16 bg-white border-b border-[var(--nkt-border)] z-30 flex items-center px-4'>
      <button onClick={onToggleSidebar} className='mr-4 text-[var(--nkt-primary)]'>
        <i className='fas fa-bars'></i>
      </button>
      <div className='font-bold text-xl text-[var(--nkt-primary)]'>Happy Burn Admin</div>
      <div className='ml-auto text-sm text-[var(--nkt-muted)]'>โรงพยาบาลนครธน</div>
    </header>
  );
}
