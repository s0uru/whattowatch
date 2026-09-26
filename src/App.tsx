import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Category from './pages/Category';
import SearchBar from './components/SearchBar';
import CategorySelect from './components/CategorySelect';
import RatingSelect from './components/RatingSelect';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white font-sans">
        <nav className="bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Logo z nową czcionką Bebas Neue */}
            <Link 
              to="/" 
              className="text-4xl font-bebas text-red-600 tracking-wide flex-shrink-0 hover:text-red-500 transition-colors"
            >
              What To Watch
            </Link>
            
            {/* Kontener na filtry i wyszukiwarkę */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              
              {/* Oceny i Kategorie obok siebie */}
              <div className="flex gap-2 w-full sm:w-auto">
                <RatingSelect />
                <CategorySelect />
              </div>
              
              {/* Wyszukiwarka */}
              <div className="w-full sm:w-72">
                <SearchBar />
              </div>
              
            </div>

          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-4 sm:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/category/:id/:name" element={<Category />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;