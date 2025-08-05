interface Genre {
    id: number;
    name: string;
}

interface MovieDetailsProps {
    movie: {
        tagline?: string;
        release_date: string;
        runtime: number;
        vote_average: number;
        vote_count: number;
        genres?: Genre[];
        overview: string;
    };
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
    return (
        <div className="md:w-2/3">
            {movie.tagline && <p className="text-gray-600 mb-4 italic">"{movie.tagline}"</p>}
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
                </div>
                <div>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                </div>
                <div>
                    <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}/10
                </div>
                <div>
                    <strong>Votes:</strong> {movie.vote_count.toLocaleString()}
                </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                    <strong>Genres:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {movie.genres.map((genre) => (
                            <span key={genre.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
            </div>
        </div>
    );
}
