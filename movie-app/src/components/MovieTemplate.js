import React from 'react';
import './MovieTemplate.scss';

const MovieTemplate = ({ children }) => {
  return (
    <div className="MovieTemplate">
      <div className="app-title">yts.mx 영화 정보</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default MovieTemplate;
