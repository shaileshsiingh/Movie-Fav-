import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

function Favorites() {
    const genreids = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Sci-Fi',
        10770: 'TV',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };

    const [curGenre, setCurGenre] = useState('All Genres');
    const [favorites, setFavorites] = useState([]);
    const [genres, setGenres] = useState([]);
    const [rating, setRating] = useState(0);
    const [popularity, setPopularity] = useState(0);
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState(5);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        let oldFav = localStorage.getItem("imdb");
        oldFav = JSON.parse(oldFav) || [];
        setFavorites(oldFav);
    }, []);
console.log(favorites)

    useEffect(() => {
        let temp = favorites.map((movie) => movie.genre_ids && movie.genre_ids[0] ? genreids[movie.genre_ids[0]] : 'Unknown');
        temp = new Set(temp);
        setGenres(["All Genres", ...temp]);
    }, [favorites]);

    const del = (movie) => {
        let newArray = favorites.filter((m) => m.id !== movie.id);
        setFavorites(newArray);
        localStorage.setItem("imdb", JSON.stringify(newArray));
    };

    let filteredMovies = curGenre === "All Genres" ? favorites : favorites.filter((movie) => genreids[movie.genre_ids[0]] === curGenre);

    if (rating === 1) {
        filteredMovies = filteredMovies.sort((objA, objB) => objA.vote_average - objB.vote_average);
    } else if (rating === -1) {
        filteredMovies = filteredMovies.sort((objA, objB) => objB.vote_average - objA.vote_average);
    }

    if (popularity === 1) {
        filteredMovies = filteredMovies.sort((objA, objB) => objA.popularity - objB.popularity);
    } else if (popularity === -1) {
        filteredMovies = filteredMovies.sort((objA, objB) => objB.popularity - objA.popularity);
    }

    filteredMovies = filteredMovies.filter((movie) => movie.title && movie.title.toLowerCase().includes(search.toLowerCase()));

    let maxPage = Math.ceil(filteredMovies.length / rows);
    let si = (curPage - 1) * rows;
    let ei = si + rows;
    filteredMovies = filteredMovies.slice(si, ei);

    const goBack = () => {
        if (curPage > 1) {
            setCurPage(curPage - 1);
        }
    };

    const goAhead = () => {
        if (curPage < maxPage) {
            setCurPage(curPage + 1);
        }
    };

    return (
        <>
            <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className={curGenre === genre ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' : 'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'}
                        onClick={() => {
                            setCurPage(1);
                            setCurGenre(genre);
                        }}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            <div className='text-center'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='border border-2 text-center p-1 m-2' />
                <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} placeholder='Rows' className='border border-2 text-center p-1 m-2' />
            </div>
            <div className="flex flex-col m-4">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className='flex'>
                                                <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/344/external-up-arrows-those-icons-lineal-those-icons-3.png' alt="sort up" className='mr-2 cursor-pointer h-6' onClick={() => { setRating(1) }} />
                                                Rating
                                                <img src='https://img.icons8.com/ios-glyphs/344/sort-down.png' alt="sort down" className='ml-2 mr-2 cursor-pointer h-6' onClick={() => { setRating(-1) }} />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className='flex'>
                                                <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/344/external-up-arrows-those-icons-lineal-those-icons-3.png' alt="sort up" className='mr-2 cursor-pointer h-6' onClick={() => { setPopularity(1) }} />
                                                Popularity
                                                <img src='https://img.icons8.com/ios-glyphs/344/sort-down.png' alt="sort down" className='ml-2 mr-2 cursor-pointer h-6' onClick={() => { setPopularity(-1) }} />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredMovies.map((movie) => (
                                        <tr key={movie.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{movie.vote_average}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{movie.popularity}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {genreids[movie.genre_ids[0]]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                <button className="text-red-600 hover:text-red-900" onClick={() => del(movie)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination pageProp={curPage} goBack={goBack} goAhead={goAhead} />
        </>
    );
}

export default Favorites;
