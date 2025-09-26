/** @format */

"use client";

import { useState } from "react";
import FlagsList from "@/components/flags/FlagsList";
import FlagsFilter from "@/components/flags/FlagsFilter";
import FlagsStats from "@/components/flags/FlagsStats";
import { useFlags } from "@/hooks/useFlags";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function FlagsPage() {
  const [filters, setFilters] = useState({
    severity: "",
    dateRange: "week",
    status: "pending",
  });

  const { flags, loading, stats, handleRecompute } = useFlags(filters);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-[var(--nkt-text)]'>Anti-Cheat System</h1>
          <p className='text-[var(--nkt-muted)] mt-1'>ตรวจสอบและจัดการกิจกรรมที่น่าสงสัย</p>
        </div>
        <button
          onClick={handleRecompute}
          className='px-4 py-2 bg-[var(--nkt-primary)] text-white rounded-lg hover:bg-[var(--nkt-primary-dark)] transition-colors'
        >
          <i className='fas fa-calculator mr-2'></i>
          Recompute Flags
        </button>
      </div>

      {/* Stats */}
      <FlagsStats stats={stats} />

      {/* Filters */}
      <FlagsFilter filters={filters} onChange={setFilters} />

      {/* Flags List */}
      {loading ? <LoadingSpinner /> : <FlagsList flags={flags} />}
    </div>
  );
}
