import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. Importujemy hook do odczytywania URL
import { axiosClient } from '../api/axiosClient';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const rating = searchParams.get('rating'); // 2. Odczytujemy ocenę z paska adresu

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // 3. Resetujemy stronę i czyścimy listę, gdy użytkownik zmieni ocenę
  useEffect(() => {
    setPage(1);
    setMovies([]);
    window.scrollTo(0, 0);
  }, [rating]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        // 4. Budujemy parametry zapytania dynamicznie
        const queryParams: Record<string, any> = {
          page: page,
          sort_by: 'popularity.desc' // Utrzymujemy sortowanie od najpopularniejszych
        };

        // 5. Jeśli użytkownik wybrał rating, dodajemy filtry
        if (rating) {
          queryParams['vote_average.gte'] = rating;
          queryParams['vote_count.gte'] = 100;
        }

        // 6. Zmieniamy endpoint na /discover/movie, bo tylko on obsługuje filtry
        const response = await axiosClient.get('/discover/movie', {
          params: queryParams
        });
        
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies(prevMovies => [...prevMovies, ...response.data.results]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchMovies();
  }, [page, rating]); // Zależność pobierania również od ratingu

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Trending Now {rating && <span className="text-amber-500 text-xl">(⭐ {rating}.0+)</span>}
      </h2>
      
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-zinc-400 animate-pulse">Loading movies...</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>
          
          <div className="mt-10 mb-4 flex justify-center">
            <button 
              onClick={() => setPage(prev => prev + 1)}
              disabled={loadingMore}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-zinc-400">No popular movies found with this rating.</p>
        </div>
      )}
    </div>
  );
}