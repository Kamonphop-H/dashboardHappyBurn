/** @format */

"use client";

import { useState } from "react";
import EvidenceGrid from "@/components/evidence/EvidenceGrid";
import EvidenceFilters from "@/components/evidence/EvidenceFilters";
import EvidenceViewer from "@/components/evidence/EvidenceViewer";
import { useEvidence } from "@/hooks/useEvidence";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function EvidencePage() {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    userId: "",
  });

  const { evidence, loading } = useEvidence(filters);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-[var(--nkt-text)]'>Evidence Management</h1>
        <p className='text-[var(--nkt-muted)] mt-1'>ตรวจสอบหลักฐานรูปภาพ</p>
      </div>

      {/* Filters */}
      <EvidenceFilters filters={filters} onChange={setFilters} />

      {/* Grid */}
      {loading ? <LoadingSpinner /> : <EvidenceGrid evidence={evidence} onSelect={setSelectedEvidence} />}

      {/* Viewer Modal */}
      {selectedEvidence && (
        <EvidenceViewer evidence={selectedEvidence} onClose={() => setSelectedEvidence(null)} />
      )}
    </div>
  );
}
