document.addEventListener('DOMContentLoaded', () => {
    fetch('https://proyecto-final-vhal06.onrender.com/api/cartelera')
    .then(respuesta => respuesta.json())
    .then(peliculas => {
        const cartelera = peliculas.filter(p => p.tipo === 'cartelera');
        const estrenos = peliculas.filter(p => p.tipo === 'estreno');
        llenarSeccion('peliculas', cartelera);
        llenarSeccion('estrenos', estrenos);
    })
    .catch(error => {
        console.error('Error:', error);});
    });
    
    function llenarSeccion(idSeccion, listaPeliculas) {
        const seccion = document.getElementById(idSeccion);
        listaPeliculas.forEach(pelicula => {
            
            const article = document.createElement('article');
            article.className = 'tarjeta-peliculas';
            article.innerHTML = `
            
            <img class="poster-pelicula" src="${pelicula.poster}" alt="poster">
            <div class="info-pelicula">
            <div class="grupo-generos">
            ${Array.isArray(pelicula.genero) 
            ? pelicula.genero.map((g, i) => `<a class="generos ${pelicula.claseGenero[i]}" href="#">${g}</a>`).join(' ') 
            : `<a class="generos ${pelicula.claseGenero}" href="#">${pelicula.genero}</a>`}
            <a class="generos clasificacion">${pelicula.clasificacion}</a>
            </div>
            
            <h3>${pelicula.titulo}</h3>
            <p class="duracion">Duración: ${pelicula.duracion} min</p>
            <p class="puntuacion">⭐ ${pelicula.puntuacion}</p>
            <a href="pelinfo.html?id=${pelicula.id}" class="boton-reservar">RESERVAR</a></div>
            `;
            seccion.appendChild(article);
        });
    }
