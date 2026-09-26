# WhatToWatch 🎬

A modern, high-performance movie discovery and recommendation web application built with React and TypeScript. Powered by The Movie Database (TMDB) API, this app allows users to seamlessly browse trending movies, search for specific titles, and filter results by genres and ratings.

## ✨ Features

* **Trending Movies:** Discover what's currently popular in the cinematic world.
* **Advanced Search & Filtering:** 
  * Search movies by title.
  * Filter by specific genres (Action, Comedy, Sci-Fi, etc.).
  * Filter by minimum user rating (e.g., ⭐ 7.0+).
* **Infinite Scrolling:** Smoothly fetch and append new movies using the "Load More" functionality.
* **Movie Details:** Dedicated pages for each movie featuring high-quality backdrops, posters, runtime, overviews, and personalized recommendations ("More Like This").
* **Responsive Design:** Fully responsive, cinematic dark-themed UI built with Tailwind CSS that looks great on mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (v4)
* **Routing:** React Router v6
* **Data Fetching:** Axios
* **Icons:** Lucide React
* **API:** [TMDB API](https://developer.themoviedb.org/docs)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) installed on your machine.
* A free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).

### Installation

1. **Clone the repository:**

        git clone [https://github.com/s0uru/whattowatch.git](https://github.com/s0uru/whattowatch.git)
        cd whattowatch

2. **Install dependencies:**

        npm install

3. **Environment Setup:**
   Create a `.env` file in the root directory of your project and add your TMDB API key:

        VITE_TMDB_API_KEY=your_tmdb_api_key_here

4. **Run the development server:**

        npm run dev

5. **Open the application:**
   Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

    src/
    ├── components/    # Reusable React components (UI elements)
    ├── pages/         # Application pages (Home, Movie Details, etc.)
    ├── services/      # API configurations and Axios requests
    ├── types/         # TypeScript interfaces and type definitions
    ├── App.tsx        # Main routing and layout
    └── main.tsx       # Application entry point

## 👤 Author

**Jakub Pietrusiak**
* GitHub: [@s0uru](https://github.com/s0uru)
