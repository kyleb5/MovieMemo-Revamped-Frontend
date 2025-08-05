import Link from 'next/link';

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

interface PlaylistCardProps {
  playlist: Playlist;
  showUser?: boolean; // Whether to show user info (for public playlists)
}

export default function PlaylistCard({ playlist, showUser = false }: PlaylistCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {playlist.name}
          </h3>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {playlist.movie_count} {playlist.movie_count === 1 ? 'movie' : 'movies'}
          </span>
        </div>
        
        {playlist.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {playlist.description}
          </p>
        )}
        
        {showUser && (
          <div className="flex items-center mb-3">
            <img
              src={playlist.user.profile_picture}
              alt={playlist.user.username}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              by {playlist.user.username}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>Created {formatDate(playlist.created_at)}</span>
        </div>
        
        <div className="flex space-x-2">
          <Link
            href={`/list/${playlist.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-md text-sm font-medium transition-colors"
          >
            View
          </Link>
          <Link
            href={`/list/${playlist.id}/edit`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-center py-2 px-3 rounded-md text-sm font-medium transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
