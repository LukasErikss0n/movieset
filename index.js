const popularContainer = document.getElementById("main-movie"); //skickar in vart en viss api ska hamna
getApiMovies(popularApiMovies, popularContainer);

const dramaContainer = document.getElementById("drama-movie");
getApiMovies(bestDramaApiMovies, dramaContainer);

const willFerriBestMovieContainer = document.getElementById("best2010-movie");
getApiMovies(willFerriBestMovie, willFerriBestMovieContainer);
