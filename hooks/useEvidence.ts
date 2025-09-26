/** @format */

"use client";
import { useEffect, useState } from "react";
export function useEvidence(filters: any) {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const sp = new URLSearchParams(filters);
    fetch(`/api/evidence/list?${sp.toString()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setEvidence(j.items || []))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);
  return { evidence, loading };
}
