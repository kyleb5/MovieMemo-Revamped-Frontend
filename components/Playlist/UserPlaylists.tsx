'use client';

import { useState, useEffect } from 'react';
import { getUserPlaylists } from '@/hooks/playlistData';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import PlaylistGrid from './PlaylistGrid';
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

interface UserPlaylistsProps {
  limit?: number;
  showCreateButton?: boolean;
  className?: string;
}

export default function UserPlaylists({ 
  limit, 
  showCreateButton = true, 
  className = '' 
}: UserPlaylistsProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserPlaylists();
    }
  }, [user]);

  const fetchUserPlaylists = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await getUserPlaylists(user.uid);
      console.log('UserPlaylists API Response:', result); // Debug log
      
      if (result.success) {
        // Ensure playlists is an array
        const playlistsArray = Array.isArray(result.playlists) ? result.playlists : [];
        const userPlaylists = limit ? playlistsArray.slice(0, limit) : playlistsArray;
        setPlaylists(userPlaylists);
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

  if (!user) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to view your playlists.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <PlaylistGrid 
        playlists={playlists}
        isLoading={isLoading}
        showUser={false}
        emptyTitle="No playlists yet"
        emptyDescription="Create your first playlist to start organizing your favorite movies."
        createButtonText="Create Your First Playlist"
        createButtonHref="/list/create"
        showCreateButton={showCreateButton}
      />
      
      {limit && playlists.length === limit && (
        <div className="text-center mt-6">
          <Link
            href="/list/my-playlists"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View All Playlists
          </Link>
        </div>
      )}
    </div>
  );
}
