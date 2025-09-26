/** @format */

"use client";

import { useParams } from "next/navigation";
import UserProfile from "@/components/users/UserProfile";
import UserActivity from "@/components/users/UserActivity";
import UserStats from "@/components/users/UserStats";
import UserFlags from "@/components/users/UserFlags";
import { useUserDetail } from "@/hooks/useUserDetail";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BackButton from "@/components/ui/BackButton";

export default function UserDetailPage() {
  const params = useParams();
  const { user, loading, error } = useUserDetail(params.id as string);

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <BackButton />
        <div>
          <h1 className='text-3xl font-bold text-[var(--nkt-text)]'>User Profile</h1>
          <p className='text-[var(--nkt-muted)]'>
            {user.full_name} ({user.employee_id})
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div>
          <UserProfile user={user} />
        </div>
        <div className='lg:col-span-2 space-y-6'>
          <UserStats stats={user.stats} />
          <UserActivity activities={user.activities} />
          <UserFlags flags={user.flags} />
        </div>
      </div>
    </div>
  );
}
