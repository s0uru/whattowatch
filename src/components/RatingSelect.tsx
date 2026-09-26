import { useNavigate, useLocation } from 'react-router-dom';

export default function RatingSelect() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pobieramy aktualny rating z paska adresu
  const searchParams = new URLSearchParams(location.search);
  const currentRating = searchParams.get('rating') || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating = e.target.value;
    const params = new URLSearchParams(location.search);

    if (newRating) {
      params.set('rating', newRating); // Dodajemy parametr ?rating=X
    } else {
      params.delete('rating'); // Usuwamy parametr, jeśli wybrano "Any Rating"
    }

    // Odświeżamy URL z nowymi parametrami, pozostając na tej samej podstronie
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentRating}
      onChange={handleChange}
      className="bg-zinc-800 text-white border border-zinc-700 rounded-full py-2 px-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors cursor-pointer text-sm w-full sm:w-auto"
    >
      <option value="">Any Rating</option>
      <option value="8">⭐ 8.0+</option>
      <option value="7">⭐ 7.0+</option>
      <option value="6">⭐ 6.0+</option>
      <option value="5">⭐ 5.0+</option>
    </select>
  );
}