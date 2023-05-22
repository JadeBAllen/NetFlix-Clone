import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './app.css';
import SearchIcon from './search.svg';

// 33a3d072 API Key
//API URL 
const API_URL = 'http://www.omdbapi.com?apikey=33a3d072';

const movie1 = {
    
    "Title": "Kill Bill: Vol. 2",
    "Year": "2004",
    "imdbID": "tt0378194",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNmFiYmJmN2QtNWQwMi00MzliLThiOWMtZjQxNGRhZTQ1MjgyXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg"

}
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        //This calls the API
        const data = await response.json();

        setMovies(data.Search);
    }
    //This allows information to be pulled upon reload
    useEffect(() => {
        searchMovies('Kill Bill'); 
    }, []);

    return (
        <div className ="app">
            <h1>Movie Universe</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies" //Allows the movies to be typed in the search bar
                    value={searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {
                                movies.map((movie) =>
                                    (<MovieCard movie={movie} />))
                            }
                        </div>
                    ) :
                    (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;