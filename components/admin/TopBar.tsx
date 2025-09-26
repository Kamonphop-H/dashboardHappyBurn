/** @format */

"use client";

import { useState } from "react";

interface TopBarProps {
  onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[var(--nkt-primary)] to-[var(--nkt-primary-dark)] text-white shadow-lg z-30'>
      <div className='h-full px-4 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button onClick={onToggleSidebar} className='p-2 hover:bg-white/10 rounded-lg transition-colors'>
            <i className='fas fa-bars'></i>
          </button>

          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Nakornthon_Hospital_Logo.svg/320px-Nakornthon_Hospital_Logo.svg.png'
                alt='Logo'
                className='w-8 h-8'
              />
            </div>
            <div>
              <h1 className='text-xl font-bold'>Happy Burn Admin</h1>
              <p className='text-xs opacity-90'>โรงพยาบาลนครธน</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          {/* Search Bar */}
          <div className='hidden md:block relative'>
            <input
              type='text'
              placeholder='Quick search...'
              className='w-64 px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/20 transition-colors'
            />
            <i className='fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70'></i>
          </div>

          {/* Notifications */}
          <div className='relative'>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors relative'
            >
              <i className='fas fa-bell'></i>
              <span className='absolute -top-1 -right-1 w-5 h-5 bg-[var(--nkt-danger)] rounded-full text-xs flex items-center justify-center'>
                3
              </span>
            </button>

            {showNotifications && (
              <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl text-gray-800 overflow-hidden'>
                <div className='p-4 border-b border-gray-200'>
                  <h3 className='font-semibold'>การแจ้งเตือน</h3>
                </div>
                <div className='max-h-96 overflow-y-auto'>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className='p-4 border-b border-gray-100 hover:bg-gray-50'>
                      <div className='flex items-start gap-3'>
                        <div className='w-8 h-8 bg-[var(--nkt-warning)] rounded-full flex items-center justify-center flex-shrink-0'>
                          <i className='fas fa-exclamation text-white text-sm'></i>
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>พบกิจกรรมที่น่าสงสัย</p>
                          <p className='text-xs text-gray-500 mt-1'>
                            User ID: 12345 - ก้าวเกิน 50,000 ต่อวัน
                          </p>
                          <p className='text-xs text-gray-400 mt-2'>5 นาทีที่แล้ว</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='p-3 bg-gray-50 text-center'>
                  <button className='text-sm text-[var(--nkt-primary)] hover:underline'>ดูทั้งหมด</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className='relative'>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className='flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors'
            >
              <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                <i className='fas fa-user text-sm'></i>
              </div>
              <span className='hidden md:block'>Admin</span>
              <i className='fas fa-chevron-down text-xs'></i>
            </button>

            {showProfile && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl text-gray-800 overflow-hidden'>
                <div className='p-4 border-b border-gray-200'>
                  <p className='font-medium'>Administrator</p>
                  <p className='text-xs text-gray-500'>admin@nkt.hospital</p>
                </div>
                <div className='py-2'>
                  <button className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2'>
                    <i className='fas fa-user-cog text-gray-400'></i>
                    <span>Profile Settings</span>
                  </button>
                  <button className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2'>
                    <i className='fas fa-shield-alt text-gray-400'></i>
                    <span>Security</span>
                  </button>
                  <button className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2'>
                    <i className='fas fa-question-circle text-gray-400'></i>
                    <span>Help</span>
                  </button>
                </div>
                <div className='p-2 border-t border-gray-200'>
                  <button className='w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2'>
                    <i className='fas fa-sign-out-alt'></i>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
