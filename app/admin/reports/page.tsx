/** @format */

"use client";

import { useState } from "react";
import ReportGenerator from "@/components/reports/ReportGenerator";
import ReportHistory from "@/components/reports/ReportHistory";
import ReportTemplates from "@/components/reports/ReportTemplates";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-[var(--nkt-text)]'>Reports & Analytics</h1>
        <p className='text-[var(--nkt-muted)] mt-1'>สร้างและจัดการรายงาน</p>
      </div>

      {/* Tabs */}
      <div className='border-b border-[var(--nkt-border)]'>
        <div className='flex space-x-8'>
          {["generate", "templates", "history"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[var(--nkt-primary)] text-[var(--nkt-primary)]"
                  : "border-transparent text-[var(--nkt-muted)] hover:text-[var(--nkt-text)]"
              }`}
            >
              {tab === "generate" && "Generate Report"}
              {tab === "templates" && "Templates"}
              {tab === "history" && "History"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "generate" && <ReportGenerator />}
      {activeTab === "templates" && <ReportTemplates />}
      {activeTab === "history" && <ReportHistory />}
    </div>
  );
}
