const express = require('express');
const app = express();


const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 4000;

const createProxyMiddleware = require('http-proxy-middleware');

//module.exports = function(app){
    
  app.use( 
    createProxyMiddleware('/apw',  {
        target: 'http://api.openweathermap.org/',
        changeOrigin: true,
        followRedirects: true,
        pathRewrite:{ '^/apw/':'/' }
    }),
    createProxyMiddleware('/api', {
      target: 'https://openapi.naver.com/',
      changeOrigin: true,
      followRedirects: true,
      pathRewrite:{ '^/api/':'/' }
    }),

    // https://yts.mx/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5
    createProxyMiddleware('/movies', {
      target: 'https://yts.mx/',
      changeOrigin: true,
      pathRewrite:{ '^/movies':'/api/v2/list_movies.json' },
      followRedirects: true,
      router: {
      //   // when request.headers.host == 'localhost:4000',
      //   // override target 'http://localhost:4000' to 'https://movie-app-2021.herokuapp.com'
        // 'localhost:4000': 'https://movie-app-2021.herokuapp.com/yts',
      },
    }),
    createProxyMiddleware('/images', {
      target: 'https://yts.mx/',
      changeOrigin: true,
      pathRewrite:{ '^/images':'' },
      followRedirects: true,
      router: {
      //   // when request.headers.host == 'localhost:4000',
      //   // override target 'http://localhost:4000' to 'https://movie-app-2021.herokuapp.com'
        // 'localhost:4000': 'https://movie-app-2021.herokuapp.com/yts',
      },
    }),
    createProxyMiddleware('/likes', {
      target: 'https://yts.mx/',
      changeOrigin: true,
      pathRewrite:{ '^/likes':'/api/v2/movie_details.json' },
      followRedirects: true,
      router: {
      //   // when request.headers.host == 'localhost:4000',
      //   // override target 'http://localhost:4000' to 'https://movie-app-2021.herokuapp.com'
        // 'localhost:4000': 'https://movie-app-2021.herokuapp.com/yts',
      },
    }),
    createProxyMiddleware('/img-yts', {
      target: 'https://img.yts.mx/',
      changeOrigin: true,
      pathRewrite:{ '^/img-yts/':'/' },
      followRedirects: true,
      router: {
        // when request.headers.host == 'localhost:4000',
        // override target 'http://localhost:4000' to 'https://movie-app-2021.herokuapp.com'
        'localhost:4000': 'https://movie-app-2021.herokuapp.com/img-yts',
      }
    }),
    createProxyMiddleware('/images', {
      target: 'https://yts.mx/',
      changeOrigin: true,
      pathRewrite:{ '^/images':'/assets/images/movies/'},
      followRedirects: true,
      router: {
      //   // when request.headers.host == 'localhost:4000',
      //   // override target 'http://localhost:4000' to 'https://movie-app-2021.herokuapp.com'
        // 'localhost:4000': 'https://movie-app-2021.herokuapp.com/yts',
      },
    }),
);

// app.use('/movies', 
//   createProxyMiddleware({
//     target: 'https://yts.mx/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5',
//     changeOrigin: true 
//   })
// );

// app.use('/likes',
//   createProxyMiddleware({
//     target: 'https://yts.mx/api/v2/movie_details.json?movie_id=' + tmpMovies[i].id,
//     changeOrigin: true 
//   })
// )

// app.use('/test', 
//   createProxyMiddleware({
//     target: 'https://yts.mx/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5',
//     changeOrigin: true 
//   })
// );

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', (request, response) => {
    response.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Server Running on: ${port}!`)
});
