const movieList = document.getElementById('films');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieRuntime = document.getElementById('movie-runtime');
const movieShowtime = document.getElementById('movie-showtime');
const availableTickets = document.getElementById('available-tickets');
const buyButton = document.getElementById('buy-ticket');

function displayMovieDetails(movie) {
  moviePoster.src = movie.poster;
  movieTitle.textContent = movie.title;
  movieRuntime.textContent = movie.runtime;
  movieShowtime.textContent = movie.showtime;
  availableTickets.textContent = movie.capacity - movie.tickets_sold;
  buyButton.disabled = movie.capacity - movie.tickets_sold === 0;
  buyButton.textContent = movie.capacity - movie.tickets_sold === 0 ? 'Sold Out' : 'Buy Ticket';
}

async function fetchMovies() {
  const response = await fetch('/films');
  const movies = await response.json();
  movies.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.classList.add('film', 'item');
    listItem.textContent = movie.title;
    listItem.addEventListener('click', () => displayMovieDetails(movie));
    movieList.appendChild(listItem);
  });
  fetchSingleMovie(movies[0].id); 
}

async function fetchSingleMovie(movieId) {
  const response = await fetch(`/films/${movieId}`);
  const movie = await response.json();
  displayMovieDetails(movie);
}

buyButton.addEventListener('click', () => {
  
  availableTickets.textContent--;
  buyButton.disabled = true;
  buyButton.textContent = 'Sold Out';
});


function fetchMovies() {
 fetch("http://localhost:3000/films")
 .then ((response) => response.json())
 .then((data) => {
    console.log(data);
 })
}
