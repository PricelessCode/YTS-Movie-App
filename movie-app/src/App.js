import React, { useState, useRef, useCallback } from 'react';
import MovieTemplate from './components/MovieTemplate';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

const App = () => {
  return (
    <MovieTemplate>
      <SearchBar/>
    </MovieTemplate>
  );
};

export default App;
