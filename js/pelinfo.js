document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const idPelicula = params.get('id');
    if (!idPelicula) {
        document.querySelector('.detalles-peliculas').innerHTML = '<h2 style="color:white;">Película no encontrada</h2>';
        return;
    }
    
    fetch(`http://localhost:3000/api/cartelera/${idPelicula}`)
    .then(respuesta => respuesta.json())
    .then(pelicula => {
        llenarDetalles(pelicula);})
        .catch(error => {
            console.error('Error:', error);
        });
    });

function llenarDetalles(pelicula) {

    document.querySelector('.titulo-detalles h1').textContent = pelicula.titulo.toUpperCase();
    const etiquetas = document.querySelector('.etiquetas');
    etiquetas.innerHTML = '';
    pelicula.genero.forEach((gen, i) => {
        
        const a = document.createElement('a');
        a.className = `generos ${pelicula.claseGenero[i]}`;
        a.href = '#';
        a.textContent = gen.toUpperCase();
        etiquetas.appendChild(a);
    });

    const clasificacion = document.createElement('a');
    clasificacion.className = 'generos clasificacion';
    clasificacion.textContent = pelicula.clasificacion;
    etiquetas.appendChild(clasificacion);

    document.querySelector('.datos-pelicula').innerHTML = `
    <p><i class="fa-regular fa-clock"></i> ${pelicula.duracion} min</p>
    <p><i class="fa-regular fa-calendar"></i> Estreno: Oct 2024</p>
    <p><i class="fa-solid fa-star"></i> ${pelicula.puntuacion}/10</p>
    `;

    document.querySelector('.sinopsis p').textContent = pelicula.sinopsis;
    const horariosContainer = document.querySelector('.horarios');
    horariosContainer.innerHTML = '<h3><i class="fa-solid fa-film"></i> Horarios Disponibles</h3>';
    
    ['El Trompillo', 'Las Brisas'].forEach(sucursal => {
        
        const divSucursal = document.createElement('div');
        divSucursal.className = 'sucursal';
        divSucursal.innerHTML = `<h4>Sucursal ${sucursal}</h4><div class="botones-horario"></div>`;

        const botonesHorario = divSucursal.querySelector('.botones-horario');

        pelicula.funciones.forEach(hora => {
            const a = document.createElement('a');
            a.href = `sala.html?pelicula=${pelicula.id}&hora=${hora}&sucursal=${sucursal}`;
            a.className = 'boton-horario';
            a.textContent = hora;
            botonesHorario.appendChild(a);
        });

        horariosContainer.appendChild(divSucursal);
    });

    document.querySelector('.caja-portada img').src = pelicula.poster;

    if (pelicula.reparto && pelicula.reparto.length > 0) {
        const actoresContainer = document.querySelector('.actores');
        actoresContainer.innerHTML = '';

        pelicula.reparto.forEach(actor => {
            const divActor = document.createElement('div');
            divActor.className = 'perfil-actor';
            divActor.innerHTML = `
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLH_kZ65Q6Qr5agp9xd5YLf6Q6iz0lAdoghYk-ZqKfg&s=10" alt="actor">
            <h4>${actor}</h4>
            `;
            actoresContainer.appendChild(divActor);
        });
    }
    document.querySelector('.trailer-btn').addEventListener('click', () => {
        window.open(pelicula.trailer, '_blank');
    });
}
