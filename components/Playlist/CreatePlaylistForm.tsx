'use client';

import { useState } from 'react';
import { createPlaylist } from '@/hooks/playlistData';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface CreatePlaylistFormProps {
  onSuccess?: (playlist: any) => void;
  onCancel?: () => void;
}

export default function CreatePlaylistForm({ onSuccess, onCancel }: CreatePlaylistFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to create a playlist');
      return;
    }

    if (!name.trim()) {
      setError('Playlist name is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await createPlaylist(user.uid, {
        name: name.trim(),
        description: description.trim() || undefined
      });

      if (result.success) {
        // Reset form
        setName('');
        setDescription('');
        
        if (onSuccess) {
          onSuccess(result.playlist);
        } else {
          // Default behavior: redirect to user's playlists or dashboard
          router.push('/dashboard');
        }
      } else {
        setError(result.error || 'Failed to create playlist');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error creating playlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setError('');
    
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Create New Playlist
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
          >
            Playlist Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Enter playlist name"
            required
            maxLength={100}
            disabled={isLoading}
          />
        </div>

        <div>
          <label 
            htmlFor="description" 
            className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
            placeholder="Describe your playlist (optional)"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Playlist'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
