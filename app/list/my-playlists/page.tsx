'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUserPlaylists } from '@/hooks/playlistData';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PlaylistGrid from '@/components/Playlist/PlaylistGrid';
import Loading from '@/components/Loading';

interface Movie {
  id: number;
  imdb_id: string;
  added_at: string;
}

interface User {
  uid: string;
  username: string;
  created_at: string;
  profile_picture: string;
}

interface Playlist {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  user: User;
  movies: Movie[];
  movie_count: number;
}

export default function UserPlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchUserPlaylists();
    }
  }, [user, authLoading, router]);

  const fetchUserPlaylists = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await getUserPlaylists(user.uid);
      
      if (result.success) {
        // Ensure playlists is an array
        const playlistsArray = Array.isArray(result.playlists) ? result.playlists : [];
        setPlaylists(playlistsArray);
      } else {
        setError(result.error || 'Failed to fetch playlists');
        setPlaylists([]); // Set empty array on error
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching playlists:', err);
      setPlaylists([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loading message="Loading your playlists..." size="lg" type="hash" color="#ef4444" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Playlists
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your movie collections
            </p>
          </div>
          <Link
            href="/list/create"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Create New Playlist
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Playlists Grid */}
        <PlaylistGrid 
          playlists={playlists}
          isLoading={isLoading}
          showUser={false}
          emptyTitle="No playlists yet"
          emptyDescription="Create your first playlist to start organizing your favorite movies."
          createButtonText="Create Your First Playlist"
          createButtonHref="/list/create"
          showCreateButton={true}
        />
      </div>
    </div>
  );
}
