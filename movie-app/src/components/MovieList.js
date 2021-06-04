import React from 'react';
import "./MovieList.scss";

class MovieList extends React.Component {
    state = {
        movies: this.props.moviesFromParent,
        clicked: false,
        clickedImage: 0,
    }

    componentDidUpdate = (previousProps, previousState) => {
        if (this.state.movies != this.props.moviesFromParent) {
            this.setState({movies: this.props.moviesFromParent});
            // console.log(this.state.movies);
        }
    }

    imgOnClick = (e) => {
        // this.setState({clicked: true, clickedImage})
        console.log('Clicked!!', e.target.getAttribute('data-key'));
        this.setState({clicked: true, clickedImage: e.target.getAttribute('data-key')})
    }
    
    render() {
        const movieImages = [];
        
        const tmp = [
            'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg',
            'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg',
            'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg',
            'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg',
            'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg'
        ];

        console.log(this.state.movies);
        // for(let i = 0; i < this.state.movies.length; i++) {
        //     movieImages.push(<img key={i} class="col" src={'https://movie-app-2021.herokuapp.com/yts/' + this.state.movies[i].medium_cover_image.match(/assets.*/)} alt='yts movie snapshot'></img>);
        // }

        for(let i = 0; i < 5; i++) {
            movieImages.push(<img key={i} data-key={i} class="" style={{width: '20%'}} onClick={this.imgOnClick} src={tmp[i]} alt='yts movie snapshot'></img>);
        }
        return (
            <div>
                <div class="container">
                    <div class="row">
                        {movieImages}
                    </div>
                    
                    <div id='coverImgDiv'>
                    
                    </div>
                </div>

            </div>
        )
    }
}

export default MovieList;