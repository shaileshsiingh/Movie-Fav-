import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Hero() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get("https://movie-task.vercel.app/api/popular?page=1")
      .then((res) => {
        if (res.data && res.data.data && res.data.data.results.length > 0) {
          setMovie(res.data.data.results[0]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch movie:", err);
      });
  }, []);

  return (
    <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[90vh] bg-center bg-cover flex items-end justify-center`}>
      <div className='text-xl md:text-3xl text-white p-4 bg-gray-900 bg-opacity-50 w-full flex justify-center'>
        {movie.title}
      </div>
    </div>
  );
}

export default Hero;
