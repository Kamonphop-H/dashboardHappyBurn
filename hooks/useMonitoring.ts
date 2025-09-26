/** @format */

"use client";
import { useEffect, useState } from "react";
export function useMonitoring() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const j = await fetch("/api/monitor/status", { cache: "no-store" }).then((r) => r.json());
    setData(j);
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, []);
  return { data, loading, refresh };
}
