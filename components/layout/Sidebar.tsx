/** @format */

"use client";
import Link from "next/link";
export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className='fixed top-16 left-0 w-64 bottom-0 bg-white border-r border-[var(--nkt-border)] z-20 p-4'>
      <nav className='space-y-2'>
        {[
          { href: "/admin/dashboard", icon: "fa-gauge", label: "Dashboard" },
          { href: "/admin/users", icon: "fa-users", label: "Users" },
          { href: "/admin/evidence", icon: "fa-image", label: "Evidence" },
          { href: "/admin/flags", icon: "fa-flag", label: "Flags" },
          { href: "/admin/monitoring", icon: "fa-heart-pulse", label: "Monitoring" },
          { href: "/admin/reports", icon: "fa-file-lines", label: "Reports" },
        ].map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--nkt-primary-light)]'
          >
            <i className={`fas ${m.icon} w-5 text-[var(--nkt-primary)]`}></i>
            <span>{m.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
