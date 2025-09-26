/** @format */

"use client";
import { useEffect, useState } from "react";

export function useFlags(filters: any) {
  const [flags, setFlags] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const sp = new URLSearchParams(filters);
    const j = await fetch(`/api/flags/list?${sp.toString()}`, { cache: "no-store" }).then((r) => r.json());
    setFlags(j.items || []);
    setStats(j.stats || {});
    setLoading(false);
  };

  const handleRecompute = async () => {
    await fetch("/api/flags/recompute", { method: "POST" });
    refresh();
  };

  useEffect(() => {
    refresh();
  }, [JSON.stringify(filters)]);

  return { flags, stats, loading, handleRecompute };
}
