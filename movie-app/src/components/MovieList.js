import React from 'react';
import "./MovieList.scss";
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui';


class MovieList extends React.Component {
    state = {
        movies: this.props.moviesFromParent,
        isClicked: false,
        clickedImage: 0,
    }

    componentDidUpdate = () => {
        if (this.state.movies !== this.props.moviesFromParent) {
            this.setState({movies: this.props.moviesFromParent});
            // console.log(this.state.movies);
        }
    
        $("#movDescription").draggable({axis: 'y'});
        $('#coverImgDiv').css('background-image','url(' + this.state.movies[this.state.clickedImage].medium_cover_image +')');
    }

    imgOnClick = (e) => {
        // this.setState({clicked: true, clickedImage})
        console.log('Clicked!!', e.target.getAttribute('data-key'));
        this.setState({isClicked: true, clickedImage: e.target.getAttribute('data-key')});
    }

    render() {
        const {isClicked, movies, clickedImage} = this.state;
        const movieImages = [];
        
        console.log(this.state.movies);
        
        for(let i = 0; i < this.state.movies.length; i++) {
            movieImages.push(<img key={i} data-key={i} class="" style={{width: (100 / this.state.movies.length) + '%'}} onClick={this.imgOnClick} src={movies[i].medium_cover_image} alt='yts movie snapshot'></img>);
        }
        
        return (
            <div id='whole-movie-container'>
                <div id='prevImgs' class="row text-center">
                        {movieImages}
                    </div>
                {isClicked ? (
                    <>
                    <div id='desc-container'>
                        <div id='coverImgDiv'></div>
                        <div id='movDescription'>
                            <p id='releasedYear'>{movies[clickedImage].year} 개봉</p>
                            <div class='row pt-2'>
                                <h3>{movies[clickedImage].title}</h3>
                            </div>
                            <div class='row'>
                                <p>{movies[clickedImage].genres.join(', ')}</p>
                            </div>
                            <div class='row mt-4'>
                                <h4>영화 정보</h4>
                            </div>
                            <div class='row'>
                                <p class='col-4 p-0'>{movies[clickedImage].runtime}분</p>
                                <p class='col-4'>평점: {movies[clickedImage].rating}</p>
                                <p class='col-4 text-right p-0'>좋아요: {movies[clickedImage].likes}</p>
                            </div>
                            <div class='row mt-4 mb-4'>
                                <h4>줄거리</h4>
                                <p>{movies[clickedImage].summary}</p>
                            </div>
                        </div>
                    </div>
                    </>
                )
                : null}
                
            </div>
        )
    }
}

export default MovieList;