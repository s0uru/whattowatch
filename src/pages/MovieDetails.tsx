import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import type { Movie, MovieDetailsData } from '../types/movie';
import MovieCard from '../components/MovieCard';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'; // original dla najwyższej jakości tła

export default function MovieDetails() {
  // useParams pobiera ID z adresu URL (np. /movie/123 -> id = "123")
  const { id } = useParams<{ id: string }>();
  
  const [movie, setMovie] = useState<MovieDetailsData | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Promise.all pozwala wykonać dwa zapytania do API jednocześnie
        const [detailsRes, recommendationsRes] = await Promise.all([
          axiosClient.get(`/movie/${id}`),
          axiosClient.get(`/movie/${id}/recommendations`)
        ]);
        
        setMovie(detailsRes.data);
        // Pobieramy tylko 10 pierwszych rekomendacji
        setRecommendations(recommendationsRes.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
      // Kiedy klikniesz w rekomendację, strona zjedzie na samą górę
      window.scrollTo(0, 0); 
    }
  }, [id]); // useEffect wykona się ponownie, jeśli zmieni się ID w pasku adresu

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-zinc-400 animate-pulse">Loading details...</p>
      </div>
    );
  }

  if (!movie) return <div className="text-white">Movie not found.</div>;

  return (
    <div className="flex flex-col gap-10">
      {/* Sekcja główna z tłem (Hero) */}
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-xl border border-zinc-800">
        {movie.backdrop_path && (
          <div className="absolute inset-0 z-0">
            <img 
              src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`} 
              alt={movie.title} 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>
          </div>
        )}
        
        {/* Treść sekcji głównej */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {movie.poster_path ? (
            <img 
              src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
              alt={movie.title} 
              className="w-64 rounded-xl shadow-2xl flex-shrink-0"
            />
          ) : (
            <div className="w-64 aspect-[2/3] bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-zinc-500">No poster</span>
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {movie.title} <span className="text-zinc-400 font-normal">({movie.release_date?.substring(0, 4) || 'N/A'})</span>
            </h1>
            
            <div className="flex flex-wrap gap-2 text-sm text-zinc-300">
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-medium">
                ⭐ {movie.vote_average?.toFixed(1) || 'NR'}
              </span>
              <span className="bg-zinc-800 px-3 py-1 rounded-full">{movie.runtime} min</span>
              {movie.genres.map(genre => (
                <span key={genre.id} className="bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
              <p className="text-zinc-300 leading-relaxed max-w-3xl">
                {movie.overview || 'No overview available.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja rekomendacji */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-red-600 pl-3">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recommendations.map(rec => (
              <MovieCard key={rec.id} movie={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}