/** @format */

"use client";
import { useEffect, useState } from "react";

export function useUserDetail(id: string) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/users/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading, error };
}
