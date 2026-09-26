// src/components/MovieCard.tsx
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-red-900/20 transition-all duration-300 flex flex-col h-full cursor-pointer">
        {movie.poster_path ? (
          <img 
            src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full aspect-[2/3] object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-500">No Poster</span>
          </div>
        )}
        
        <div className="p-4 flex flex-col flex-grow justify-between">
          <h2 className="font-semibold text-lg line-clamp-1" title={movie.title}>
            {movie.title}
          </h2>
          <div className="flex justify-between items-center mt-3 text-sm text-zinc-400 font-medium">
            <span>{movie.release_date ? movie.release_date.substring(0, 4) : 'Brak daty'}</span>
            <span className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-md text-amber-400">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}