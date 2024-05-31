// URL base del servidor de la API
const API_SERVER = "https://api.themoviedb.org/3";

// API Key para autenticar las solicitudes
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzA2MWY4ZDhiZjFhMmRjYzg0NmM5NmU1NzJjNzM1MSIsInN1YiI6IjY2NThkZmU4ODZjYzJiNzJkZjFkMjk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z7EgcVaNy0lSoC9fCyE9mzn5QoVNaKrhlKwiiulTw-M";

// Opciones de la solicitud fetch, incluyendo el método y los headers
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Función para crear elementos HTML
const createElement = (tag, className, attributes = {}) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  return element;
};

// Función para cargar películas en la cuadrícula de tendencias
const fetchMoviesGrid = async (page = 1) => {
  try {
    const response = await fetch(
      `${API_SERVER}/movie/popular?page=${page}`,
      options
    );
    const data = await response.json();
    const movies = data.results;

    const tendenciasContainer = document.querySelector(
      ".peliculasTendencia .peliculas"
    );
    tendenciasContainer.innerHTML = "";

    movies.forEach((movie) => {
      const pelicula = createElement("div", "pelicula");
      const anchor = createElement("a", "", { href: "./views/detail.html" });
      const img = createElement("img", "imgTendencia", {
        src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        alt: movie.title,
        loading: "lazy",
      });
      const tituloPelicula = createElement("div", "tituloPelicula");
      const titulo = createElement("h4", "");
      titulo.textContent = movie.title;
      tituloPelicula.appendChild(titulo);
      pelicula.append(img, tituloPelicula);
      anchor.appendChild(pelicula);
      tendenciasContainer.appendChild(anchor);
    });

    tendenciasContainer.parentElement.setAttribute("data-page", page);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

// Event listener para el botón "Anterior"
document.querySelector(".anterior").addEventListener("click", () => {
  let currentPage = Number(
    document.querySelector(".peliculasTendencia").getAttribute("data-page")
  );
  if (currentPage > 1) {
    fetchMoviesGrid(currentPage - 1);
  }
});

// Event listener para el botón "Siguiente"
document.querySelector(".siguiente").addEventListener("click", () => {
  let currentPage = Number(
    document.querySelector(".peliculasTendencia").getAttribute("data-page")
  );
  fetchMoviesGrid(currentPage + 1);
});

// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  fetchMoviesGrid();
});
