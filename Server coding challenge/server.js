const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const cors = require( './middleware/cors' );
const uuid = require('uuid');
const {Moviedex} = require('./models/moviedex-model');
const {validateToken} = require('./middleware/token-validation');

const app = express();


app.use( cors );

app.post('/api/add-movie/',jsonParser, (req,res) => {
    let {movie_title, movie_year, movie_rating} = req.body;
    if(!movie_title || !movie_year || !movie_rating){
        res.statusMessage="You need to send all movie fields to add the movie to the movie list";
        return res.status(403).end();
    }

    movie_id = uuid.v4();
    let newMovie = {
        movieTitle: movie_title,
        movieYear: movie_year,
        movieRating: movie_rating,
        movieID: movie_id
    }
    console.log(newMovie);
    Moviedex.addNewMovie(newMovie)
            .then((createdMovie) => {
                res.status(201).json(createdMovie);
            })
            .catch((err) => {
                res.statusMessage = err.message;
                return res.status(400).end()
            });

})

app.get('/api/movies/', (req,res) => {
    Moviedex.getAllMovies()
            .then((returnedMovies) => {
                if(returnedMovies.length == 0){
                    res.statusMessage = "No movies found in the moviedex";
                    return res.status(404).end();
                } else {
                    res.status(200).json(returnedMovies);
                }
            })
            .catch((err) => {
                res.statusMessage = err.message;
                return res.status(400).end()
            })
})

/* 
    Your code goes here 
*/

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});