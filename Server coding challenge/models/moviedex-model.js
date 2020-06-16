const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* 
    Your code goes here 
*/
const moviedexSchema = mongoose.Schema({
    movieTitle : {
        type: String,
        required: true
    },
    movieYear : {
        type: Number,
        required: true
    },
    movieRating : {
        type: Number,
        required : true
    },
    movieID : {
        type: String,
        unique: true,
        required: true
    }
});

const moviedexCollection = mongoose.model('moviedex',moviedexSchema);

const Moviedex = {
    addNewMovie : function(newMovie){
        return moviedexCollection
                .create(newMovie)
                .then((createdMovie) => {
                    return createdMovie;
                })
                .catch((err) => {
                    throw new Error(err);
                });
    },
    getAllMovies : function(){
        return moviedexCollection
                .find()
                .then((allMovies) => {
                    return allMovies;
                })
                .catch((err) => {
                    throw new Error(err);
                });
    }
}

module.exports = {
    Moviedex
};