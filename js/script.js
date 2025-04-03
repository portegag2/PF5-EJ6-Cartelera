const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const TRENDING_API = 'https://api.themoviedb.org/3/trending/movie/day?api_key=3fd2be6f0c70a2a598f084ddfb75487c'

// Elementos del DOM
document.addEventListener('DOMContentLoaded', () => {
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

// Obtener la película más trending
async function getTrendingMovies() {
    const res = await fetch(TRENDING_API)
    const data = await res.json()

    if (data.results && data.results.length > 0) {
        const trendingMovies = data.results.slice(0, 3) // Obtener las primeras 3 películas trending
        console.log('Películas más trending:', trendingMovies)
        showTrendingMovies(trendingMovies)
    }
}

function showTrendingMovies(movies) {
    const trendingCarousel = document.createElement('div')
    trendingCarousel.classList.add('trending-carousel')

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const trendingEl = document.createElement('div')
        trendingEl.classList.add('trending-movie')

        trendingEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
           
        `
        trendingCarousel.appendChild(trendingEl)
    })

    main.prepend(trendingCarousel) // Agregar el carrusel al inicio del contenedor principal
}
// Obtener las 3 películas más trending al cargar la página
getTrendingMovies()

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function showMovies(movies) {
    // Limpiar el contenido principal
    main.innerHTML = ''

    // Crear el contenedor del carrusel
    const movieCarousel = document.createElement('div')
    movieCarousel.classList.add('movie-carousel')

    // Iterar sobre las películas y agregarlas al carrusel
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        movieCarousel.appendChild(movieEl)
    })

    // Agregar el carrusel al contenedor principal
    main.appendChild(movieCarousel)
}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
})