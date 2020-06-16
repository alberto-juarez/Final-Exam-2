import React from 'react';

function Movie( props ){
    return(
        <div clssNmae="movie">
            <h1>
                {props.title}
            </h1>
            <h3>
                Rating : {props.rating}
            </h3>
            <h3>
                Year : {props.year}
            </h3>
            <h3>
                ID : {props.id}
            </h3>

        </div>
    );
}

export default Movie;