/** @format */

"use client";
import { useEffect, useMemo, useState } from "react";

export function useUserSearch(filters: any) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    sortBy: "employee_id",
    sortOrder: "asc",
  });

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries({
      ...filters,
      page: pagination.page,
      limit: pagination.limit,
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
    })) {
      if (v) sp.set(k, String(v));
    }
    return `/api/users/search?${sp.toString()}`;
  }, [filters, pagination.page, pagination.limit, pagination.sortBy, pagination.sortOrder]);

  useEffect(() => {
    setLoading(true);
    fetch(query, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        setUsers(j.items || []);
        setPagination((p) => ({ ...p, total: j.total || 0 }));
        setLoading(false);
      });
  }, [query]);

  const handleSort = (k: string) => {
    setPagination((p) => ({ ...p, sortBy: k, sortOrder: p.sortOrder === "asc" ? "desc" : "asc" }));
  };
  const handlePageChange = (page: number) => setPagination((p) => ({ ...p, page }));

  return { users, loading, pagination, handleSort, handlePageChange };
}
