"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPopularMovies, getPopularMoviesThisWeek } from '@/hooks/movieData';
import Image from 'next/image';
import Loading from '@/components/Loading';

export default function PopularMovies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [popularMoviesWeek, setPopularMoviesWeek] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

 const handleClick = (movieId: number) => {
  router.push(`/film/${movieId}`);
};


  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch both popular movies and trending movies this week
        const [popularResult, weeklyResult] = await Promise.all([
          getPopularMovies(1),
          getPopularMoviesThisWeek(1)
        ]);
        
        if (popularResult.success) {
          setMovies(popularResult.movies);
        } else {
          setError(popularResult.error);
        }
        
        if (weeklyResult.success) {
          setPopularMoviesWeek(weeklyResult.movies);
        } else if (!popularResult.success) {
          setError(weeklyResult.error);
        }
        
      } catch (err: any) {
        setError('Failed to fetch movies');
      }
      
      setLoading(false);
    }
    
    fetchMovies();
  }, []);

  if (loading) return <Loading message="Loading popular movies..." size="lg" type="hash" color="#ef4444" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-8">
      {/* Popular Movies Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex flex-col items-center cursor-pointer group" onClick={() => handleClick(movie.id)} >

              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  style={{ aspectRatio: '2/3' }}
                />
              ) : (
                <div className="w-[200px] h-[300px] bg-gray-300 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <p className="text-sm font-medium mt-2 text-center group-hover:text-blue-500 transition-colors duration-200">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending This Week Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Trending This Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularMoviesWeek.map((movie) => (
            <div key={`week-${movie.id}`} className="flex flex-col items-center cursor-pointer group" onClick={() => handleClick(movie.id)} >
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  style={{ aspectRatio: '2/3' }}
                />
              ) : (
                <div className="w-[200px] h-[300px] bg-gray-300 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <p className="text-sm font-medium mt-2 text-center group-hover:text-blue-500 transition-colors duration-200">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}