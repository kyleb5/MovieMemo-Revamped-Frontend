import Link from 'next/link';
import PlaylistCard from './PlaylistCard';
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

interface PlaylistGridProps {
  playlists: Playlist[];
  isLoading?: boolean;
  showUser?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  createButtonText?: string;
  createButtonHref?: string;
  showCreateButton?: boolean;
}

export default function PlaylistGrid({
  playlists,
  isLoading = false,
  showUser = false,
  emptyTitle = "No playlists yet",
  emptyDescription = "Create your first playlist to start organizing your favorite movies.",
  createButtonText = "Create Your First Playlist",
  createButtonHref = "/list/create",
  showCreateButton = true
}: PlaylistGridProps) {
  
  if (isLoading) {
    return <Loading message="Loading playlists..." size="lg" type="hash" color="#ef4444" />;
  }

  if (!Array.isArray(playlists) || playlists.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {emptyTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {emptyDescription}
          </p>
          {showCreateButton && (
            <Link
              href={createButtonHref}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {createButtonText}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {playlists.map((playlist) => (
        <PlaylistCard 
          key={playlist.id} 
          playlist={playlist} 
          showUser={showUser}
        />
      ))}
    </div>
  );
}
