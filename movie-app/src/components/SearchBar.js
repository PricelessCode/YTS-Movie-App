import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import MovieList from './MovieList';
import { MovieTemplate } from './MovieTemplate';
import './SearchBar.scss';


let axios = require('axios');

const SearchBar = () => {
  const [movies, setMovies] = useState('');

  const getSearchMovie = async () => {
    const ID_KEY = 'MPF85hV_M_MgoJFe46Ms';
    const SECRET_KEY = 'uSvgQms2A1';
  
    try { 
      console.log('Requested to the server!')
          let result = await axios.get('https://movie-app-2021.herokuapp.com/yts/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5');
          setMovies(result.data.data.movies);
          console.log(movies);
        } catch (error) {
          console.log(error);
        }
  }; 

  const onSubmit = (e) => {
    e.preventDefault();
    getSearchMovie();
  };

  return (
    <div>
      <form className="SearchBar" onSubmit={onSubmit}>
        {/* TextField for Searching */}
        <input
          placeholder="입력포맷: <정렬기준> <검색개수> 예: like 5"
        />
        
        {/* + Button */}
        <button type="submit">
          <MdAdd />
        </button>
      </form>
      <MovieList moviesFromParent={movies}/>
    </div>
  );
};

export default SearchBar;
