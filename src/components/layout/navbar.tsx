'use client';

import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Control</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.firstName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.emailAddresses[0]?.emailAddress}</p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
