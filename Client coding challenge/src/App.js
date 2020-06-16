import React from 'react';
import './App.css';
import Movie from './Movie';
import MovieForm from './MovieForm';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      apiURL : 'http://localhost:8080/api/',
      error : "",
      displayData : []
      /*
        Your code goes here
      */
    }
  }

  createMovie = (event) => {
    event.preventDefault();
    let title = event.target.movie_title.value;
    let year = Number(event.target.movie_year.value);
    let rating = Number(event.target.movie_rating.value);
    let newMovie = {
      movie_title: title,
      movie_year: year,
      movie_rating: rating
    }
    let url= `${this.state.apiURL}add-movie`;
    let settings = {
      method: 'POST',
      headers: {
        'session_exam_token': 'success-token',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newMovie)
    }
    fetch(url, settings)
        .then((returnedMovies) => {
          this.componentDidMount();
        })
        .catch((err) => {
          this.setState({
            error: err.message
          });
        })
  }
  
  /*
    Your code goes here
  */
  
  componentDidMount(){
    let url= `${this.state.apiURL}movies`;
    let settings = {
      method: 'GET',
      headers: {
        "session_exam_token": "success-token"
      }
    }
    fetch(url,settings)
        .then((returnedMovies) => {
          return returnedMovies.json();
        })
        .then((JSONMovies) => {
          console.log(JSONMovies);
          this.setState({
            displayData: JSONMovies
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message
          });
        })
    /*
      Your code goes here
    */
  }

  render(){
    return (
      <div>
        <div className="container-form">
          <h1>MOVIEDEX</h1>
          <h2>{this.state.error}</h2>
          <MovieForm onSubmit={this.createMovie}/>
        </div>
        <div className="container">
          {this.state.displayData.map(movie => {
            return <Movie id={movie.movieID} title={movie.movieTitle} rating={movie.movieRating} year={movie.movieYear} />
          })}        
        </div>
      </div>
    );
  }
}

export default App;
