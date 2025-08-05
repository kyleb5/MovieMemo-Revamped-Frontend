'use client';

import { useAuth } from '@/hooks/useAuth';
import CreatePlaylistForm from '@/components/Playlist/CreatePlaylistForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/Loading';

export default function CreatePlaylistPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Loading..." size="lg" type="hash" color="#ef4444" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const handleSuccess = (playlist: any) => {
    // Redirect to the newly created playlist or dashboard
    router.push('/dashboard');
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create a New Playlist
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Organize your favorite movies into custom playlists
          </p>
        </div>
        
        <CreatePlaylistForm 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
