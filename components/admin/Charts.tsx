/** @format */

"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Charts({ data }: any) {
  const lineChartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
    },
    yaxis: {
      title: {
        text: "จำนวน",
      },
    },
    colors: ["#00a19a", "#4ecdc4", "#ff6b35"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    tooltip: {
      theme: "light",
    },
    legend: {
      position: "top",
    },
  };

  const series = [
    {
      name: "ผู้ใช้งาน Active",
      data: [450, 520, 480, 590, 620, 580, 640],
    },
    {
      name: "ก้าวรวม (พัน)",
      data: [320, 380, 350, 420, 450, 410, 480],
    },
    {
      name: "แคลอรี่ (พัน)",
      data: [180, 220, 200, 250, 280, 240, 290],
    },
  ];

  return (
    <div className='bg-white rounded-xl shadow-sm border border-[var(--nkt-border)] p-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold text-[var(--nkt-text)]'>Weekly Activity Trends</h3>
        <p className='text-sm text-[var(--nkt-muted)] mt-1'>ภาพรวมกิจกรรมรายสัปดาห์</p>
      </div>
      <Chart options={lineChartOptions} series={series} type='area' height={350} />
    </div>
  );
}
