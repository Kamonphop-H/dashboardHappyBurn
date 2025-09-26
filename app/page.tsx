/** @format */

import Navbar from "@/components/navbar";
import AdminSearchPage from "./admin/search/page";

export default function Home() {
  return (
    <div className='min-h-dvh flex flex-col overflow-hidden'>
      <Navbar />
      <AdminSearchPage />
    </div>
  );
}
