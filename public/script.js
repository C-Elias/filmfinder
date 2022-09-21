const tmdbKey = '936a55f98e7d3629e1d4c085a3042b42';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres; 
      return genres; 
      // console.log(jsonResponse);
    }
  } catch(error) {
    console.log(error);
  };
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie'; 
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);


    if (response.ok) {
      const jsonResponse = await response.json()
      const movies = jsonResponse.results;
      // console.log(movies);
      return movies;
    }
  } catch (error) {
    console.log(error); 
  }; 
};



const getMovieInfo = async (movie) => {
  let movieId = movie.id;
  let movieEndpoint = "/movie/" + movieId;
  let requestParams = "?api_key=" + tmdbKey;
  let urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
    else {
      // throw new Error("Request failed!");
      console.log("request [for movie] failed!");
    }
  }
  catch (error) {
    console.log(error);
  }

};


const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();

  };

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  return displayMovie(info);

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;