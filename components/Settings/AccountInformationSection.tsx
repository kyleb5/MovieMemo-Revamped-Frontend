'use client';

interface AccountInformationSectionProps {
  user: any;
  dbUser: any;
}

export default function AccountInformationSection({ user, dbUser }: AccountInformationSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          {user.email || dbUser?.email || 'Not available'}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          User ID
        </label>
        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-xs">
          {user.uid}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Account Created
        </label>
        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          {dbUser?.created_at ? new Date(dbUser.created_at).toLocaleDateString() : 
           user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Not available'}
        </div>
      </div>
    </div>
  );
}
