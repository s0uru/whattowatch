import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import type { Genre } from '../types/movie';

export default function CategorySelect() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosClient.get('/genre/movie/list');
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const searchParams = new URLSearchParams(location.search);
    
    // Jeśli wybrano "All Categories", wracamy na stronę główną (zachowując parametry oceny)
    if (value === "all") {
      navigate(`/?${searchParams.toString()}`);
    } 
    // W przeciwnym razie przenosimy na wybraną kategorię
    else if (value) {
      const [selectedId, selectedName] = value.split('|');
      navigate(`/category/${selectedId}/${selectedName}?${searchParams.toString()}`);
    }
  };

  const match = location.pathname.match(/\/category\/(\d+)\/(.+)/);
  const currentId = match ? match[1] : null;
  const currentName = match ? decodeURIComponent(match[2]) : null;
  
  // Jeśli nie jesteśmy na podstronie kategorii, wartość selektora to domyślnie "all"
  const currentValue = currentId && currentName ? `${currentId}|${currentName}` : "all";

  return (
    <select 
      value={currentValue}
      onChange={handleChange} 
      className="bg-zinc-800 text-white border border-zinc-700 rounded-full py-2 px-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer text-sm w-full sm:w-auto"
    >
      {/* 1. Nowa, aktywna opcja cofająca wybór kategorii */}
      <option value="all">All Categories</option>
      
      {/* 2. Dynamicznie ładowane gatunki */}
      {genres.map(genre => (
        <option key={genre.id} value={`${genre.id}|${genre.name}`}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}