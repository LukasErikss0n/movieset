const apiKey = "api_key=1a08c634ec1bc9d64558c15c3e88cdbf";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";

const popularApiMovies =
  baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey; //fixa till alla olika genre som ska finnas
const bestDramaApiMovies =
  baseUrl +
  "/discover/movie?with_genres=18&primary_release_year=2014&" +
  apiKey;
const willFerriBestMovie =
  baseUrl +
  "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&" +
  apiKey;

const seconPopular = document.getElementById("main-movie");
const sectionDrama = document.getElementById("drama-movie");
const sectionBestmovies = document.getElementById("best2010-movie");

const formSearch = document.getElementById("form-search");
const search = document.getElementById("search");
const searchUrl = baseUrl + "/search/movie?" + apiKey;
const popularGenre = document.getElementById("popular-genre");

function getApiMovies(url, container) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.resutls);
      showMovies(data.results, container);
    });
}

const popularContainer = document.getElementById("main-movie");
getApiMovies(popularApiMovies, popularContainer);
const dramaContainer = document.getElementById("drama-movie");
getApiMovies(bestDramaApiMovies, dramaContainer);
const willFerriBestMovieContainer = document.getElementById("best2010-movie");
getApiMovies(willFerriBestMovie, willFerriBestMovieContainer);

function showMovies(movies, container) {
  console.log(container);

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-card");
    movieEl.innerHTML = `
        
        <a href = "specification.html"><img
        src="${imgUrl + poster_path}"
        alt="${title}"
        /></a>
        <div class="movie-info">


         `;

    container.appendChild(movieEl);
  });
}

function moreAboutMovie(){
    innerHTML = `
    
    <div class="movie-specification">
            <div class="movie-information">
                <img
                    src="${imgUrl+poster_path}"
                    alt="${title}"
                />
                <div class="movie-tittle-review">
                    <h2>${title}</h2>
                    <div class="review-background">
                    <span class="${getRatingColor(vote_average)}">${vote_average}</span>
                    </div>
                </div>
                <div class="movie-overview-button">
                    <p>${overview}</p>
                    <a class="button-blue button-styling" href="#">Play</a>
                    <a class="button-red button-styling" href="index.html">Return</a>
                </div>
            </div>
        </div>
    
    `
}

function getRatingColor(vote) {
  if (vote >= 8) {
    return "review-green";
  } else if (vote >= 5) {
    return "review-orange";
  } else {
    return "review-red";
  }
}

console.log("form", formSearch);
search.addEventListener("keydown", (e) => {
  e.preventDefault();
  console.log(e);

  if (e.key === "enter") {
    const searchTerm = search.value;

    if (searchTerm) {
      getApiMovies(searchUrl + "&query=" + searchTerm); //där search term ska liga i en container//);
    }
  }
});
