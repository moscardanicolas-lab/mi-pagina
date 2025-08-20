// ========================
// Mensaje de bienvenida
// ========================
document.addEventListener("DOMContentLoaded", () => {
    alert("¡Bienvenido a mi página web! 🎉");
});

// ========================
// Contador de clics
// ========================
let contador = 0;
const contadorBtn = document.getElementById("contadorBtn");
const contadorSpan = document.getElementById("contador");

if (contadorBtn && contadorSpan) {
    contadorBtn.addEventListener("click", () => {
        contador++;
        contadorSpan.textContent = contador;
    });
}

// ========================
// Modo oscuro / claro
// ========================
const modoBtn = document.getElementById("modoBtn");

if (modoBtn) {
    modoBtn.addEventListener("click", () => {
        document.body.classList.toggle("oscuro");

        if (document.body.classList.contains("oscuro")) {
            modoBtn.textContent = "Cambiar a modo claro";
        } else {
            modoBtn.textContent = "Cambiar a modo oscuro";
        }
    });
}

// ========================
// Buscador de películas 🎥 (Actualización en tiempo real)
// ========================
const inputPelicula = document.getElementById("inputPelicula");
const resultadoPeliculas = document.getElementById("resultadoPeliculas");

let temporizadorBusqueda;

async function buscarPeliculas(nombre) {
    if (!nombre) {
        resultadoPeliculas.innerHTML = "<p>🔎 Escribe el nombre de una película para ver resultados.</p>";
        return;
    }

    resultadoPeliculas.innerHTML = "<p>Buscando películas...</p>";

    try {
        const respuesta = await fetch(`https://www.omdbapi.com/?apikey=564727fa&s=${nombre}`);
        const data = await respuesta.json();

        if (data.Response === "True") {
            resultadoPeliculas.innerHTML = data.Search.map(pelicula => `
                <div class="pelicula">
                    <img src="${pelicula.Poster}" alt="${pelicula.Title}" width="100">
                    <p><strong>${pelicula.Title}</strong> (${pelicula.Year})</p>
                </div>
            `).join("");
        } else {
            resultadoPeliculas.innerHTML = `<p>❌ No se encontraron películas con el nombre "${nombre}".</p>`;
        }
    } catch (error) {
        resultadoPeliculas.innerHTML = "<p>❌ Error al conectar con la API. Intenta de nuevo más tarde.</p>";
    }
}

if (inputPelicula) {
    inputPelicula.addEventListener("input", () => {
        clearTimeout(temporizadorBusqueda);
        temporizadorBusqueda = setTimeout(() => {
            buscarPeliculas(inputPelicula.value.trim());
        }, 500);
    });
}
