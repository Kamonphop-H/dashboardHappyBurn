/** @format */

"use client";

import SystemHealth from "@/components/monitoring/SystemHealth";
import SyncStatus from "@/components/monitoring/SyncStatus";
import PerformanceMetrics from "@/components/monitoring/PerformanceMetrics";
import ErrorLogs from "@/components/monitoring/ErrorLogs";
import { useMonitoring } from "@/hooks/useMonitoring";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MonitoringPage() {
  const { data, loading, refresh } = useMonitoring();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-[var(--nkt-text)]'>System Monitoring</h1>
          <p className='text-[var(--nkt-muted)] mt-1'>ตรวจสอบสถานะระบบและประสิทธิภาพ</p>
        </div>
        <button
          onClick={refresh}
          className='px-4 py-2 bg-[var(--nkt-primary)] text-white rounded-lg hover:bg-[var(--nkt-primary-dark)] transition-colors'
        >
          <i className='fas fa-sync mr-2'></i>
          Refresh
        </button>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <SystemHealth data={data?.health} />
        <SyncStatus data={data?.sync} />
        <PerformanceMetrics data={data?.performance} />
        <ErrorLogs logs={data?.errors} />
      </div>
    </div>
  );
}
