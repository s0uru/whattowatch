import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react'; // Importujemy ikonkę z lucide-react

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Przenosi użytkownika np. na /search/batman
      navigate(`/search/${encodeURIComponent(query.trim())}`);
      setQuery(''); // Czyści pole po wyszukaniu
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
        aria-label="Search"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
}