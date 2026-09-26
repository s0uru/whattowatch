import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';

export default function Category() {
  const { id, name } = useParams<{ id: string, name: string }>();
  const [searchParams] = useSearchParams();
  const rating = searchParams.get('rating');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    window.scrollTo(0, 0);
  }, [id, rating]);

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const queryParams: Record<string, any> = {
          with_genres: id,
          page: page
        };

        if (rating) {
          queryParams['vote_average.gte'] = rating;
          queryParams['vote_count.gte'] = 100;
        }

        const response = await axiosClient.get('/discover/movie', {
          params: queryParams
        });
        
        setTotalPages(response.data.total_pages);

        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies(prev => [...prev, ...response.data.results]);
        }
      } catch (error) {
        console.error("Error fetching category movies:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    if (id) {
      fetchCategoryMovies();
    }
  }, [id, page, rating]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-red-600 pl-3">
        {name} Movies {rating && <span className="text-amber-500 text-xl">(⭐ {rating}.0+)</span>}
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
          <p className="text-xl text-zinc-400">No movies found with these filters.</p>
        </div>
      )}
    </div>
  );
}