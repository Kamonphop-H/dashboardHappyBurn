/** @format */

"use client";

import { useState } from "react";
import UserSearch from "@/components/users/UserSearch";
import UserTable from "@/components/users/UserTable";
import UserFilters from "@/components/users/UserFilters";
import { useUserSearch } from "@/hooks/useUserSearch";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function UsersPage() {
  const [filters, setFilters] = useState({
    query: "",
    from: "",
    to: "",
    status: "",
    department: "",
  });

  const { users, loading, pagination, handleSort, handlePageChange } = useUserSearch(filters);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-[var(--nkt-text)]'>User Management</h1>
        <p className='text-[var(--nkt-muted)] mt-1'>จัดการและค้นหาข้อมูลผู้ใช้งาน</p>
      </div>

      {/* Search & Filters */}
      <UserSearch onSearch={setFilters} />
      <UserFilters filters={filters} onChange={setFilters} />

      {/* Results */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <UserTable
          users={users}
          pagination={pagination}
          onSort={handleSort}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
