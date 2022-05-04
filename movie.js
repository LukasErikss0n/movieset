const apiKey = "api_key=1a08c634ec1bc9d64558c15c3e88cdbf";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const backdropUrl = "https://image.tmdb.org/t/p/original";

const seconHero = document.getElementById("hero-section");
const seconPopular = document.getElementById("main-movie");
const sectionDrama = document.getElementById("drama-movie");
const sectionBestmovies = document.getElementById("best2010-movie");
const movieCardSpecification = document.getElementById("specification-card");
const searchContainer = document.getElementById("search-container");
const searchUrl = baseUrl + "/search/movie?query=";

const formSearch = document.getElementById("form-search");
const search = document.getElementById("search");
const showH2 = document.getElementById("search-h2");
const popularGenre = document.getElementById("popular-genre");

function getApiMovies(url, container) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results); //ta bort sen
      showMovies(data.results, container);
    })
    .catch((err) => {
      console.log(err);
      alert("Somthing whent wrong, please try again.");
    });
}

async function getApiMovieDetails(id) {
  let apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=1a08c634ec1bc9d64558c15c3e88cdbf`;

  console.log("Getting: " + apiUrl);

  let apiInfo = await fetch(apiUrl);

  let apiJsonInfo = await apiInfo.json();
  showDetails(apiJsonInfo);

  return apiJsonInfo;
}

function showDetails(data) {
  console.log(data);
  const {
    title,
    backdrop_path,
    vote_average,
    overview,
    release_date,
    adult,
    id,
    runtime,
    genres,
    homepage,
  } = data;

  const movieEl = document.createElement("div");
  movieEl.classList.add("movie-information");
  movieEl.setAttribute("data-id", id);
  movieEl.innerHTML = `
    <div class = "movie-information-card">
    <div class ="close-info">
      <p class ="close-info-p">X</p>
    </div>
    <div class = "movie-background-img" style="background-image: url(${
      backdropUrl + backdrop_path
    })">
  <div class ="tittle-and-button">
    <h2 class="tittle">${title}<h2>
    <a href ="${homepage}" class ="button-play"><i class="fas fa-play-circle"></i>Play</a>
  </div>
  </div>
  <div class ="movie-overview-info">
      <p class ="relase-date"><span class = ${getRatingColor(
        vote_average
      )}>${vote_average} Vote avrage</span> ${release_date}<span class="age-limit">${whoCanWatch(
    adult
  )}</span><span class="runtime">${runtime} minutes</span>
  <span class ="genres">${genres[0].name}</span></p>
      <p class ="overview">${overview}</p>
     
  </div>
  </div>

  
  `;
  document.body.appendChild(movieEl);
}

function showMovies(movies, container) {
  movies.forEach(function (movie) {
    const { title, poster_path, id } = movie; //kallar på datan som jag vill använda från arrayn
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-card");
    movieEl.setAttribute("data-id", id);
    movieEl.innerHTML = `
       
        <img class="movie-image" src="${imgUrl + poster_path}"alt="${title}"/>
        
         `;

    movieEl.onclick = function (event) {
      document.body.style.overflowY = "hidden";
      const id = event.target.parentElement.getAttribute("data-id");
      getApiMovieDetails(id);
      console.log();
    };

    container.appendChild(movieEl); //här lägs html kod till ^ i en specifik kontainer(beror på vad jag skickar in i getApimovies andra parameter)
  });
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

function whoCanWatch(adult) {
  // har märkt att de´n inte riktigt har något syfte då inprinsip ingen är 18 + filmer men jag tycker ändp att den ska finnas ifall att
  if (adult === true) {
    return "18+";
  } else {
    return "13+";
  }
}

search.onkeydown = function (event) {
  searchContainer.innerHTML = "";
  if (event.key === "Enter") {
    event.preventDefault();
    doSearch();
  }
};

function doSearch() {
  if (search.value === "") {
    hideSearchResultH2();
    showNoResultsMessage();
  } else {
    let searchTerm = search.value;
    const searchResult = searchUrl + searchTerm + "&" + apiKey;
    getApiMovies(searchResult, searchContainer);
    showSearchResultH2();
  }
}

// Har försökt att fixa search men har inte lyckades ännu
// console.log(window.location)
// let searchParams = new URLSearchParams(window.location.search)
// let id = searchParams.get("id")
// console.log(id)

let searchSymbol = document.getElementById("search-symbol");

searchSymbol.onclick = function (event) {
  event.preventDefault();

  doSearch();
};

function showSearchResultH2() {
  if (showH2) {
    showH2.style.display = "block";
  }
}

function hideSearchResultH2() {
  if (showH2) {
    showH2.style.display = "none";
  }
}

document.body.onclick = function (event) {
  if (event.target.classList.contains("close-info-p")) {
    event.target.closest(".movie-information").style.display = "none";
    document.body.style.overflowY = "scroll";
    event.target.closest(".movie-information-card").style.position = "inherit";
  } else if (
    event.target.classList.contains("movie-backdrop") === false &&
    event.target.classList.contains("movie-overview-info") === false
  ) {
    if (event.target.classList.contains("movie-information")) {
      event.target.style.display = "none";
      document.body.style.overflowY = "scroll";
    }
  }
};
