import { IMAGE_BASE_URL } from '../api-thmdb/apiMetodos.js'


export function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
            </div>
        </div>
    `;
}

