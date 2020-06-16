import React from 'react';

function MovieForm( props ){
    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    <label>
                        Movie Title
                    </label>
                    <input type="text" id="movie_title"/>
                </div>
                <div>
                    <label>
                        Movie Year
                    </label>
                    <input type="text" id="movie_year"/>
                </div>
                <div>
                    <label>
                        Movie Rating
                    </label>
                    <input type="text" id="movie_rating"/>
                </div>
                <button type="submit">
                    Create movie
                </button>
            </form>
        </div>
    );
}

export default MovieForm;