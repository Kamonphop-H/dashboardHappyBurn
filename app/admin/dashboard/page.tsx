/** @format */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ActivityChart from "@/components/dashboard/ActivityChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import DataQuality from "@/components/dashboard/DataQuality";
import SuspiciousAlert from "@/components/dashboard/SuspiciousAlert";
import { useDashboardData } from "@/hooks/useDashboardData";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function DashboardPage() {
  const { data, loading, error, refetch } = useDashboardData();

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorBoundary error={error} retry={refetch} />;
  if (!data) return null;

  return (
    <ErrorBoundary>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-[var(--nkt-text)]'>Dashboard Overview</h1>
            <p className='text-[var(--nkt-muted)] mt-1'>
              ข้อมูล ณ วันที่{" "}
              {new Date().toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={refetch}
            className='px-4 py-2 bg-[var(--nkt-primary)] text-white rounded-lg hover:bg-[var(--nkt-primary-dark)] transition-colors flex items-center gap-2'
          >
            <i className='fas fa-sync'></i>
            รีเฟรชข้อมูล
          </button>
        </div>

        {/* Stats Grid */}
        <StatsGrid data={data.totals} />

        {/* Suspicious Alert */}
        {(data.suspicious.high > 0 || data.suspicious.med > 0) && (
          <SuspiciousAlert suspicious={data.suspicious} />
        )}

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <ActivityChart data={data.weeklyData} />
          </div>
          <div>
            <RecentActivity activities={data.recentActivity} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <DataQuality data={data.data_quality} />
          <QuickActions />
          <div className='bg-white rounded-xl shadow-sm p-6 border border-[var(--nkt-border)]'>
            <h3 className='text-lg font-semibold text-[var(--nkt-text)] mb-4'>System Status</h3>
            <div className='space-y-3'>
              <StatusItem label='API' status='online' />
              <StatusItem label='Database' status='online' />
              <StatusItem label='Sync' status='synced' />
              <StatusItem label='Storage' status='85%' warning />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function StatusItem({
  label,
  status,
  warning = false,
}: {
  label: string;
  status: string;
  warning?: boolean;
}) {
  return (
    <div className='flex justify-between items-center'>
      <span className='text-[var(--nkt-muted)]'>{label}</span>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          warning ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
