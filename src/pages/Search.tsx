import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';

export default function Search() {
  const { query } = useParams<{ query: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Przechowuje max liczbę stron z API
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Kiedy zmieni się wpisana fraza (query), resetujemy stronę do 1
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [query]);

  // Uruchamia się przy pierwszej frazie oraz przy każdej zmianie strony (kliknięciu Load More)
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const response = await axiosClient.get(`/search/movie`, {
          params: { query: query, page: page }
        });
        
        setTotalPages(response.data.total_pages);

        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies(prev => [...prev, ...response.data.results]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, page]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Search results for: <span className="text-red-500">{query}</span>
      </h2>
      
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-zinc-400 animate-pulse">Searching...</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>

          {/* Wyświetlamy przycisk tylko, jeśli obecna strona jest mniejsza niż wszystkie dostępne strony */}
          {page < totalPages && (
            <div className="mt-10 mb-4 flex justify-center">
              <button 
                onClick={() => setPage(prev => prev + 1)}
                disabled={loadingMore}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-zinc-400">No movies found.</p>
        </div>
      )}
    </div>
  );
}