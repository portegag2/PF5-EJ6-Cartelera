import { fetchPopularMovies } from '../api-thmdb/apiMetodos.js';
import { createMovieCard } from '../tarjeta-min/tarjeta-min.js'

console.log("apiMetodos inicio");
// Reemplaza 'TU_API_KEY' con tu API key real de TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

let currentPosition = 0;
const carouselElement = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');


function moveCarousel(direction) {
    const cards = document.querySelectorAll('.movie-card');
    const cardWidth = cards[0].offsetWidth + 20; // Including margin
    const maxPosition = -(cards.length - 4) * cardWidth;
    
    if (direction === 'next') {
        currentPosition = Math.max(currentPosition - cardWidth, maxPosition);
    } else {
        currentPosition = Math.min(currentPosition + cardWidth, 0);
    }
    
    carouselElement.style.transform = `translateX(${currentPosition}px)`;
}

export async function initCarousel() {
    const movies = await fetchPopularMovies();
    const movieCards = movies.map(createMovieCard).join('');
    carouselElement.innerHTML = movieCards;
    
    prevButton.addEventListener('click', () => moveCarousel('prev'));
    nextButton.addEventListener('click', () => moveCarousel('next'));
}

initCarousel();
