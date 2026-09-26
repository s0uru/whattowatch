import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY
  },
  headers: {
    'Content-Type': 'application/json',
  },
});