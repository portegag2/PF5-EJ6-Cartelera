import { getConfig } from './apiConexion.js';

// Reemplaza 'TU_API_KEY' con tu API key real de TMDB
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';



//let API_KEY = await getConfig();

export async function fetchPopularMovies() {
    //const LOCAL_API_KEY = "915966e619bc1bab9238399ad1fe6e90";
    console.log("fetchPopularMovies inicio");
    const  LOCAL_API_KEY = await getConfig();
    // Si getConfig no funciona poner directamente la API_KEY
    //const LOCAL_API_KEY = "";
    
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
