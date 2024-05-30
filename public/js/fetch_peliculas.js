const API_SERVER = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzA2MWY4ZDhiZjFhMmRjYzg0NmM5NmU1NzJjNzM1MSIsInN1YiI6IjY2NThkZmU4ODZjYzJiNzJkZjFkMjk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z7EgcVaNy0lSoC9fCyE9mzn5QoVNaKrhlKwiiulTw-M";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Ejemplo de solicitud fetch utilizando la configuración de options
fetch(`${API_SERVER}/movie/popular`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud.");
    }
    return response.json();
  })
  .then((data) => {
    // Manejo de los datos obtenidos de la API
    console.log(data);
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });
// Función para mostrar las películas tendencia en la página
const showTrendingMovies = async () => {
  const moviesContainer = document.querySelector(
    ".peliculasTendencia .peliculas"
  );

  try {
    const movies = await fetchTrendingMovies();
    moviesContainer.innerHTML = ""; // Limpiar contenido existente

    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("pelicula");

      const movieLink = document.createElement("a");
      movieLink.href = `./views/detail.html?id=${movie.id}`;

      const movieImage = document.createElement("img");
      movieImage.classList.add("imgTendencia");
      movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      movieImage.alt = movie.title;
      movieImage.loading = "lazy";

      const movieTitle = document.createElement("div");
      movieTitle.classList.add("tituloPelicula");
      movieTitle.innerHTML = `<h4>${movie.title}</h4>`;

      movieLink.appendChild(movieImage);
      movieLink.appendChild(movieTitle);
      movieElement.appendChild(movieLink);
      moviesContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error("Error al mostrar las películas tendencia:", error);
  }
};

// Llamar a la función para mostrar las películas tendencia al cargar la página
document.addEventListener("DOMContentLoaded", showTrendingMovies);
