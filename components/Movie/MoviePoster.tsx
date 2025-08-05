import Image from "next/image";

interface MoviePosterProps {
    posterPath: string | null;
    title: string;
}

export default function MoviePoster({ posterPath, title }: MoviePosterProps) {
    return (
        <div className="md:w-1/3">
            {posterPath ? (
                <Image
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title}
                    width={400}
                    height={600}
                    className="rounded-lg shadow-lg"
                />
            ) : (
                <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                </div>
            )}
        </div>
    );
}
