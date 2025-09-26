/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["main"]);

  const menuItems = [
    {
      group: "main",
      label: "หลัก",
      items: [
        { path: "/admin/dashboard", label: "Dashboard", icon: "fa-gauge-high" },
        { path: "/admin/search", label: "ค้นหาผู้ใช้", icon: "fa-magnifying-glass" },
        { path: "/admin/evidence", label: "หลักฐาน", icon: "fa-camera" },
      ],
    },
    {
      group: "monitoring",
      label: "ตรวจสอบ",
      items: [
        { path: "/admin/flags", label: "Anti-Cheat", icon: "fa-flag" },
        { path: "/admin/monitoring", label: "Sync & Monitor", icon: "fa-satellite-dish" },
      ],
    },
    {
      group: "reports",
      label: "รายงาน",
      items: [
        { path: "/admin/reports/daily", label: "รายงานรายวัน", icon: "fa-calendar-day" },
        { path: "/admin/reports/weekly", label: "รายงานรายสัปดาห์", icon: "fa-calendar-week" },
        { path: "/admin/reports/monthly", label: "รายงานรายเดือน", icon: "fa-calendar" },
      ],
    },
  ];

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]));
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg z-20 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className='h-full flex flex-col'>
        <nav className='flex-1 p-4 space-y-4 overflow-y-auto'>
          {menuItems.map((group) => (
            <div key={group.group}>
              {isOpen && (
                <button
                  onClick={() => toggleGroup(group.group)}
                  className='w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[var(--nkt-muted)] uppercase tracking-wider hover:text-[var(--nkt-primary)] transition-colors'
                >
                  {group.label}
                  <i
                    className={`fas fa-chevron-${
                      expandedGroups.includes(group.group) ? "down" : "right"
                    } text-xs`}
                  ></i>
                </button>
              )}
              {(isOpen ? expandedGroups.includes(group.group) : true) && (
                <div className='mt-2 space-y-1'>
                  {group.items.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-[var(--nkt-primary)] text-white shadow-md"
                            : "hover:bg-[var(--nkt-primary-light)] hover:text-[var(--nkt-primary)]"
                        }`}
                        title={!isOpen ? item.label : undefined}
                      >
                        <i className={`fas ${item.icon} ${isOpen ? "w-5" : "mx-auto"}`}></i>
                        {isOpen && <span className='ml-3'>{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className='p-4 border-t border-[var(--nkt-border)]'>
          <div className={`flex items-center ${isOpen ? "justify-between" : "justify-center"}`}>
            {isOpen && (
              <div className='text-xs text-[var(--nkt-muted)]'>
                <div>Version 2.0.0</div>
                <div>© 2024 NKT Hospital</div>
              </div>
            )}
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
              <i className='fas fa-cog text-[var(--nkt-muted)]'></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
