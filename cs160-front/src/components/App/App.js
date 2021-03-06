import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//Testing Again

class App extends Component {
  state = {
    top50Movies: [],
    topActionMovies: [],
    topComedyMovies: [],
    topHorrorMovies: [],
    moviePosters: {},
    isLoaded: false,
    actionMoviesLoaded: false,
    comedyMoviesLoaded: false,
    horrormMoviesLoaded: false,
    imagesLoaded: true
  };

  componentDidMount() {
    axios
      .get('/api/movies/topmovies')
      .then(res => {
        console.log(res.data);
        this.setState({ top50Movies: res.data });
        this.setState({ isLoaded: true });
        this.getMoviePosters(res.data);
      })
      .catch(err => console.error(err));

    axios
      .get('/api/movies/topactionmovies')
      .then(res => {
        console.log(res.data);
        this.setState({ topActionMovies: res.data });
        this.setState({ actionMoviesLoaded: true });
        this.getMoviePosters(res.data);
      })
      .catch(err => console.error(err));

    axios
      .get('/api/movies/topcomedymovies')
      .then(res => {
        console.log(res.data);
        this.setState({ topComedyMovies: res.data });
        this.setState({ comedyMoviesLoaded: true });
        this.getMoviePosters(res.data);
      })
      .catch(err => console.error(err));

    axios
      .get('/api/movies/tophorrormovies')
      .then(res => {
        console.log(res.data);
        this.setState({ topHorrorMovies: res.data });
        this.setState({ horrorMoviesLoaded: true });
        this.getMoviePosters(res.data);
      })
      .catch(err => console.error(err));
  }

  getMoviePosters = movies => {
    try {
      movies.forEach(async movie => {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              movie.id
            }?api_key=d3174f7b933d2334bd229b8535a3cf3c`
          )
          .then(res => {
            this.setState(prevState => ({
              moviePosters: { ...prevState.moviePosters, [movie.title]: res.data.poster_path }
            }));
          });
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoaded: true });
    }
  };

  imagesFailedToLoad = () => this.setState({ imagesLoaded: false });

  render() {
    const {
      isLoaded,
      top50Movies,
      topActionMovies,
      actionMoviesLoaded,
      topComedyMovies,
      topHorrorMovies,
      horrorMoviesLoaded,
      comedyMoviesLoaded,
      moviePosters,
      imagesLoaded
    } = this.state;
    if (!isLoaded)
      return (
        <div className="d-flex justify-content-center" style={{ marginTop: '370px' }}>
          <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

    return (
      <div className="pt-5" style={{ paddingLeft: '8.5%', marginTop: '70px' }}>
        <h1>Action</h1>
        <div className="row">
          {actionMoviesLoaded &&
            topActionMovies.map(movie => {
              return (
                <div>
                  <div
                    key={movie.id}
                    className="card movie-card"
                    style={{
                      width: '18rem',
                      margin: '10px',
                      marginBottom: '15px',
                      paddingBottom: '1%'
                    }}
                  >
                    {!imagesLoaded ? (
                      <div className="black-box">
                        <h4 className="pl-2 pr-2">{movie.title}</h4>
                      </div>
                    ) : (
                      <img
                        onError={this.imagesFailedToLoad}
                        src={`https://image.tmdb.org/t/p/w500/${moviePosters[movie.title]}`}
                        className="card-img-top"
                        alt={movie.title}
                      />
                    )}
                    <div className="card-body">
                      <p className="card-text">
                        Released:<strong> {movie.release_date}</strong>
                      </p>
                      <p className="card-text pb-2">
                        Rating:<strong> {movie.vote_average}</strong>
                      </p>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => this.props.history.push(`/movie/${movie._id}`)}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <h1>Comedy</h1>
        <div className="row">
          {comedyMoviesLoaded &&
            topComedyMovies.map(movie => {
              return (
                <div>
                  <div
                    key={movie.id}
                    className="card movie-card"
                    style={{
                      width: '18rem',
                      margin: '10px',
                      marginBottom: '15px',
                      paddingBottom: '1%'
                    }}
                  >
                    {!imagesLoaded ? (
                      <div className="black-box">
                        <h4 className="pl-2 pr-2">{movie.title}</h4>
                      </div>
                    ) : (
                      <img
                        onError={this.imagesFailedToLoad}
                        src={`https://image.tmdb.org/t/p/w500/${moviePosters[movie.title]}`}
                        className="card-img-top"
                        alt={movie.title}
                      />
                    )}
                    <div className="card-body">
                      <p className="card-text">
                        Released:<strong> {movie.release_date}</strong>
                      </p>
                      <p className="card-text pb-2">
                        Rating:<strong> {movie.vote_average}</strong>
                      </p>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => this.props.history.push(`/movie/${movie._id}`)}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <h1>Horror</h1>
        <div className="row">
          {horrorMoviesLoaded &&
            topHorrorMovies.map(movie => {
              return (
                <div
                  key={movie.id}
                  className="card movie-card"
                  style={{
                    width: '18rem',
                    margin: '10px',
                    marginBottom: '15px',
                    paddingBottom: '1%'
                  }}
                >
                  {!imagesLoaded ? (
                    <div className="black-box">
                      <h4 className="pl-2 pr-2">{movie.title}</h4>
                    </div>
                  ) : (
                    <img
                      onError={this.imagesFailedToLoad}
                      src={`https://image.tmdb.org/t/p/w500/${moviePosters[movie.title]}`}
                      className="card-img-top"
                      alt={movie.title}
                    />
                  )}
                  <div className="card-body">
                    <p className="card-text">
                      Released:<strong> {movie.release_date}</strong>
                    </p>
                    <p className="card-text pb-2">
                      Rating:<strong> {movie.vote_average}</strong>
                    </p>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => this.props.history.push(`/movie/${movie._id}`)}
                    >
                      Play
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <h1>Top Rated</h1>
        <div className="row">
          {isLoaded &&
            top50Movies.map(movie => {
              return (
                <div
                  key={movie.id}
                  className="card movie-card"
                  style={{
                    width: '18rem',
                    margin: '10px',
                    marginBottom: '70px',
                    paddingBottom: '1%'
                  }}
                >
                  {!imagesLoaded ? (
                    <div className="black-box">
                      <h4 className="pl-2 pr-2">{movie.title}</h4>
                    </div>
                  ) : (
                    <img
                      onError={this.imagesFailedToLoad}
                      src={`https://image.tmdb.org/t/p/w500/${moviePosters[movie.title]}`}
                      className="card-img-top"
                      alt={movie.title}
                    />
                  )}
                  <div className="card-body">
                    <p className="card-text">
                      Released:<strong> {movie.release_date}</strong>
                    </p>
                    <p className="card-text pb-2">
                      Rating:<strong> {movie.vote_average}</strong>
                    </p>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => this.props.history.push(`/movie/${movie._id}`)}
                    >
                      Play
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <div style={{ paddingLeft: '40%', paddingBottom: '3%' }}>
          <button className="btn btn-dark pl-5 pr-5">Load More</button>{' '}
        </div>
      </div>
    );
  }
}

export default App;
