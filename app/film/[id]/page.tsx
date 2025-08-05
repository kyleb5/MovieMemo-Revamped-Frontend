"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieById } from "@/hooks/movieData";
import Loading from "@/components/Loading";
import MoviePoster from "@/components/Movie/MoviePoster";
import MovieDetails from "@/components/Movie/MovieDetails";

export default function MoviePage() {
    const params = useParams();
    const movieId = params?.id as string;
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            if (!movieId) return;
            
            setLoading(true);
            setError(null);
            
            const result = await getMovieById(movieId);
            
            if (result.success) {
                setMovie(result.movie);
                document.title = `${result.movie.title} - MovieMemo`;
            } else {
                setError(result.error);
            }
            
            setLoading(false);
        }
        
        fetchMovieDetails();
    }, [movieId]);

    if (loading) return <Loading message="Loading movie details..." size="lg" type="hash" color="#ef4444" />;
    if (error) return <div className="container mx-auto px-4 py-8"><p>Error: {error}</p></div>;
    if (!movie) return <div className="container mx-auto px-4 py-8"><p>Movie not found</p></div>;

    return (
        <>
            <title>{movie.title}</title>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                
                <div className="flex flex-col md:flex-row gap-8">
                    <MoviePoster posterPath={movie.poster_path} title={movie.title} />
                    <MovieDetails movie={movie} />
                </div>
            </div>
        </>
    );
}
