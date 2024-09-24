document.addEventListener("DOMContentLoaded", () => {
    let moviesData = [];

    // Cargar los datos de películas
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {
            moviesData = data; // Guardar los datos de películas
        })
        .catch(error => console.error("Error al cargar los datos:", error));

    // Evento para el botón de búsqueda
    document.getElementById("btnBuscar").addEventListener("click", () => {
        const searchTerm = document.getElementById("inputBuscar").value.toLowerCase();
        const results = moviesData.filter(movie => {
            return movie.title.toLowerCase().includes(searchTerm) ||
                   movie.genres.some(genre => typeof genre === 'string' && genre.toLowerCase().includes(searchTerm)) ||
                   movie.tagline.toLowerCase().includes(searchTerm) ||
                   movie.overview.toLowerCase().includes(searchTerm);
        });

        displayResults(results);
    });

    // Función para mostrar los resultados
    function displayResults(results) {
        const lista = document.getElementById("lista");
        lista.innerHTML = ""; // Limpiar resultados previos

        results.forEach(movie => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "bg-light", "text-dark");
            listItem.innerHTML = `
                <h5>${movie.title}</h5>
                <p>${movie.tagline}</p>
                <p>Rating: ${"⭐".repeat(Math.round(movie.vote_average / 2))}</p>
            `;
            listItem.addEventListener("click", () => {
                showMovieDetails(movie); // Mostrar detalles de la película al hacer clic
            });
            lista.appendChild(listItem);
        });
    }

    function showMovieDetails(movie) {
        document.getElementById("tituloPelicula").textContent = movie.title;
        document.getElementById("overviewPelicula").textContent = movie.overview;
    
        // Asegúrate de que genres sea un array de strings
        document.getElementById("generosPelicula").textContent = `Géneros: ${movie.genres.map(genre => genre.name).join(', ')}`;
    
        // Mostrar año, duración, presupuesto y ganancias
        document.getElementById("anioLanzamiento").textContent = new Date(movie.release_date).getFullYear();
        document.getElementById("duracion").textContent = movie.runtime || 'N/A';
        document.getElementById("presupuesto").textContent = movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A';
        document.getElementById("ganancias").textContent = movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A';
    
        const detallePelicula = document.getElementById("detallePelicula");
        detallePelicula.style.display = "block"; // Mostrar el contenedor de detalles
    
        // Manejo del botón de detalles
        const infoAdicional = document.getElementById("infoAdicional");
        document.getElementById("btnDetalles").onclick = () => {
            infoAdicional.style.display = infoAdicional.style.display === "none" ? "block" : "none";
        };
    }
});