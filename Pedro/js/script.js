import { getConfig } from './Pedro/config/config.js';
// Reemplaza 'TU_API_KEY' con tu API key real de TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

let currentPosition = 0;
const carouselElement = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

//let API_KEY = await getConfig();

async function fetchPopularMovies() {
    //const LOCAL_API_KEY = "";
    const  LOCAL_API_KEY = getConfig();
    // Si getConfig no funciona poner directamente la API_KEY
    //const LOCAL_API_KEY = "";
    
    // Add 3 second delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("script.js LOCAL_API_KEY:", LOCAL_API_KEY);
    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${LOCAL_API_KEY}&language=es-ES`
        );
        const data = await response.json();
        console.log(data.results);
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
            </div>
        </div>
    `;
}

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

async function initCarousel() {
    const movies = await fetchPopularMovies();
    const movieCards = movies.map(createMovieCard).join('');
    carouselElement.innerHTML = movieCards;
    
    prevButton.addEventListener('click', () => moveCarousel('prev'));
    nextButton.addEventListener('click', () => moveCarousel('next'));
}

initCarousel();
