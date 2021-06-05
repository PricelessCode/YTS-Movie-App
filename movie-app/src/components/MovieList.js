import React from 'react';
import "./MovieList.scss";
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui';


class MovieList extends React.Component {
    state = {
        movies: this.props.moviesFromParent,
        clicked: false,
        clickedImage: 0,
    }

    
    componentDidUpdate = () => {
        if (this.state.movies !== this.props.moviesFromParent) {
            this.setState({movies: this.props.moviesFromParent});
            // console.log(this.state.movies);
            
            
        }
    }

    componentDidMount = () => { 
        $(function () {
            $("#movDescription").draggable({axis: 'y'});
        });
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
            <div id='whole-movie-container'>
                <div class="row">
                    {movieImages}
                </div>
                
                <div id='coverImgDiv'></div>
                <div id='movDescription'>
                    <p id='releasedYear'>2010 개봉</p>
                    <div class='row pt-2'>
                        <h3>Inception</h3>
                    </div>
                    <div class='row'>
                        <p>Action, Adventure, Crime, Mystery, Sci-Fi, Thriller</p>
                    </div>
                    <div class='row mt-4'>
                        <h4>영화 정보</h4>
                    </div>
                    <div class='row'>
                        <p class='col-4 p-0'>148분</p>
                        <p class='col-4'>평점: 8.8</p>
                        <p class='col-4 text-right p-0'>좋아요: 1959</p>
                    </div>
                    <div class='row mt-4'>
                        <h4>줄거리</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieList;