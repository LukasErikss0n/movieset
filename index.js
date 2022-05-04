const popularApiMovies =
  baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey; //Hämtar Api för det olika kategorierna för att använda datan
const bestDramaApiMovies =
  baseUrl +
  "/discover/movie?with_genres=18&primary_release_year=2014&" +
  apiKey;
const willFerriBestMovie =
  baseUrl +
  "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&" +
  apiKey;

const popularContainer = document.getElementById("main-movie"); //skickar in vart en viss api ska hamna
getApiMovies(popularApiMovies, popularContainer);

const dramaContainer = document.getElementById("drama-movie");
getApiMovies(bestDramaApiMovies, dramaContainer);

const willFerriBestMovieContainer = document.getElementById("best2010-movie");
getApiMovies(willFerriBestMovie, willFerriBestMovieContainer);
