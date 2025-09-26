/** @format */

"use client";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ActivityChart({
  data,
}: {
  data: Array<{ date: string; steps: number; kcal: number }>;
}) {
  const series = [
    { name: "Steps", data: data.map((d) => d.steps) },
    { name: "kcal", data: data.map((d) => d.kcal) },
  ];
  const options: any = {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: { categories: data.map((d) => d.date) },
    stroke: { width: [3, 3] },
  };
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-[var(--nkt-border)]'>
      <div className='text-lg font-semibold mb-3'>7-Day Activity</div>
      <ReactApexChart options={options} series={series} type='line' height={300} />
    </div>
  );
}
