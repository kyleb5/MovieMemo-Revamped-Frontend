'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { getUserByUid } from "@/hooks/userData";
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import ProfilePictureSection from '@/components/Settings/ProfilePictureSection';
import UsernameChangeSection from '@/components/Settings/UsernameChangeSection';
import AccountInformationSection from '@/components/Settings/AccountInformationSection';

export default function DashboardSettings() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [dbUser, setDbUser] = useState<any>(null);        
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        setLoadingUserData(true);
        try {
          const userData = await getUserByUid(user.uid);
          setDbUser(userData?.user || null);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoadingUserData(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleUserUpdate = (updatedUser: any) => {
    setDbUser(updatedUser);
  };

  if (authLoading || loadingUserData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loading message="Loading settings..." size="lg" type="hash" color="#ef4444" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Account Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account preferences and profile information
          </p>
        </div>

        {/* Profile Picture Section */}
        <ProfilePictureSection 
          dbUser={dbUser} 
          onUserUpdate={handleUserUpdate} 
        />

        {/* User Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UsernameChangeSection 
              dbUser={dbUser} 
              onUserUpdate={handleUserUpdate} 
            />
            <AccountInformationSection 
              user={user} 
              dbUser={dbUser} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
