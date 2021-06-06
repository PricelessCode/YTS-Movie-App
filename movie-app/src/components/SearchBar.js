import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import MovieList from './MovieList';
import { MovieTemplate } from './MovieTemplate';
import './SearchBar.scss';


let axios = require('axios');

const SearchBar = () => {
  let [movies, setMovies] = useState(null);
  let [isSearched, setIsSearched] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const getSearchMovie = async () => {
    const ID_KEY = 'MPF85hV_M_MgoJFe46Ms';
    const SECRET_KEY = 'uSvgQms2A1';
  
    try {
      console.log('Requested to the server!')
          let result = await axios.get('https://movie-app-20181663.herokuapp.com/movies?sort_by=like_count&order_by=desc&limit=5');
          let tmpMovies = result.data.data.movies;
          
          for (let i = 0; i < tmpMovies.length; i++) {
            let proxyImg = 'https://movie-app-20181663.herokuapp.com/images/' + tmpMovies[i].medium_cover_image.match(/assets.*/);
            tmpMovies[i].medium_cover_image = proxyImg;
          }
            
          // for (let i = 0; i < tmpMovies.length; i++) {
          //   let likeObject= await axios.get('https://movie-app-20181663.herokuapp.com/likes?movie_id=' + tmpMovies[i].id);  
          //   tmpMovies[i].likes = likeObject.data.data.movie.like_count;
          // }

          let likeList = [];
          for (let i = 0; i < tmpMovies.length; i++) {
            likeList.push(axios.get('https://movie-app-20181663.herokuapp.com/likes?movie_id=' + tmpMovies[i].id));
          }
          
          Promise.all(likeList).then(response => {
            for (let i = 0; i < tmpMovies.length; i++) {
              tmpMovies[i].likes = response[i].data.data.movie.like_count;
            }
          })
          
          // let result = await axios.get('http://localhost:4000/yts');
          setMovies(tmpMovies);
          console.log(movies);
          setIsLoading(false);
          
    } catch (error) {
      console.log(error);
    }
  }; 

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSearched(true);
    setIsLoading(true);
    getSearchMovie();
  };

  function checkComponents() {
    if (!isSearched) {
      return null;
    }

    if (isLoading) {
      return (
        <div>
          <div class="spinner-grow text-primary loader" role="status"></div>
        </div>
      );
    } else {
      return (
        <MovieList moviesFromParent={movies}/>
      );
    }
  }

  return (
    <div>
      <form className="SearchBar" onSubmit={onSubmit}>
        {/* TextField for Searching */}
        <input placeholder="입력포맷: <정렬기준> <검색개수> 예: like 5"/>
        
        {/* + Button */}
        <button type="submit">
          <MdAdd />
        </button>
      </form>
      {/* Conditional Rendering */}
      {checkComponents()}
    </div>
  );
};

export default SearchBar;
