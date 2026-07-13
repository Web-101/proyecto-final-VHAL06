document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const idPelicula = params.get('pelicula');
    const horaFuncion = params.get('hora');
    const sucursal = params.get('sucursal');
    
    if (!idPelicula || !horaFuncion || !sucursal) {
        document.querySelector('.sala-compra').innerHTML = '<h2 style="color:white; text-align:center;">Falta información de la función</h2>';
        return;
    }
    
    const storageKey = `asientos_${idPelicula}_${horaFuncion}_${sucursal.replace(/\s/g, '_')}`;
    const PRECIO_POR_ASIENTO = 50;
    let asientosSeleccionados = [];

    fetch(`http://localhost:3000/api/cartelera/${idPelicula}`)
        .then(respuesta => respuesta.json())
        .then(pelicula => {
            document.querySelector('.detalle-sala h1').textContent = pelicula.titulo.toUpperCase();
            document.querySelector('.sala-detalle').innerHTML = `
                <p><i class="fa-regular fa-calendar"></i> ${sucursal}, ${horaFuncion}</p>
                <p><i class="fa-solid fa-location-dot"></i> Sala ${Math.floor(Math.random() * 10) + 1}, (IMAX)</p>
            `;
        })
        .catch(error => {
            console.error('Error al cargar película:', error);
        });

    function cargarAsientosOcupados() {
        const ocupados = JSON.parse(localStorage.getItem(storageKey)) || [];
        ocupados.forEach(idAsiento => {
            const butaca = document.querySelector(`[data-asiento="${idAsiento}"]`);
            if (butaca) {
                butaca.classList.remove('disponible');
                butaca.classList.add('ocupada');
            }
        });
    }
    
    function guardarAsientosOcupados(nuevosOcupados) {
        const ocupados = JSON.parse(localStorage.getItem(storageKey)) || [];
        const todosOcupados = [...new Set([...ocupados, ...nuevosOcupados])];
        localStorage.setItem(storageKey, JSON.stringify(todosOcupados));
    }
    
    cargarAsientosOcupados();
    document.querySelectorAll('.fila .butaca').forEach(butaca => {
        butaca.addEventListener('click', () => {
            if (butaca.classList.contains('ocupada') || butaca.classList.contains('guia')) return;
            const idAsiento = butaca.getAttribute('data-asiento');
            if (!idAsiento) return;

            if (butaca.classList.contains('seleccionado')) {
                butaca.classList.remove('seleccionado');
                butaca.classList.add('disponible');
                asientosSeleccionados = asientosSeleccionados.filter(a => a !== idAsiento);
            } else if
            
            (butaca.classList.contains('disponible')) {
                butaca.classList.remove('disponible');
                butaca.classList.add('seleccionado');
                asientosSeleccionados.push(idAsiento);
            }
            actualizarResumen();
        });
    });
    
    function actualizarResumen() {
        const cantidad = asientosSeleccionados.length;
        const total = cantidad * PRECIO_POR_ASIENTO;
        document.getElementById('cantidad-asientos').textContent = `x${cantidad}`;

        const detalleContainer = document.getElementById('detalle-asientos');
        if (cantidad === 0) {
            detalleContainer.innerHTML = '<p class="dato">Ninguno seleccionado</p>';
        } else {
            const ordenados = [...asientosSeleccionados].sort();
            detalleContainer.innerHTML = ordenados.map(a => `<p class="dato">Asiento ${a}</p>`).join('');
        }
        document.getElementById('total-pagar').textContent = `${total} bs.`;
    }
    
    const btnContinuar = document.getElementById('btn-continuar');
    const modalPago = document.getElementById('modal-pago');
    const btnCerrar = document.getElementById('btn-cerrar');
    const btnComprar = document.getElementById('btn-comprar');
    const modalConfirmacion = document.getElementById('modal-confirmacion');
    const btnCerrarConfirmacion = document.getElementById('btn-cerrar-confirmacion');

    btnContinuar.addEventListener('click', () => {
        if (asientosSeleccionados.length === 0) {
            alert('Debes seleccionar al menos un asiento.');
            return;
        }
        modalPago.classList.add('activo');
    });
    btnCerrar.addEventListener('click', () => {
        modalPago.classList.remove('activo');
    });
    modalPago.addEventListener('click', (e) => {
        if (e.target === modalPago) modalPago.classList.remove('activo');
    });
    modalConfirmacion.addEventListener('click', (e) => {
        if (e.target === modalConfirmacion) modalConfirmacion.classList.remove('activo');
    });
    btnComprar.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();

        if (!nombre) { alert('Ingresa tu nombre.'); return; }
        if (!correo) { alert('Ingresa tu correo.'); return; }

        modalPago.classList.remove('activo');
        const cantidad = asientosSeleccionados.length;
        const total = cantidad * PRECIO_POR_ASIENTO;
        const ordenados = [...asientosSeleccionados].sort();
        const tituloPelicula = document.querySelector('.detalle-sala h1').textContent;

        document.getElementById('mensaje-gracias').textContent = `¡Gracias por tu compra, ${nombre}!`;
        document.getElementById('ticket-virtual').innerHTML = `
        
        <p><strong>Película:</strong> ${tituloPelicula}</p>
        <p><strong>Función:</strong> ${sucursal}, ${horaFuncion}</p>
        <p><strong>Asientos:</strong> ${ordenados.join(', ')}</p>
        <p><strong>Total:</strong> ${total} bs.</p>
        <p><strong>Correo:</strong> ${correo}</p>
        `;

        modalConfirmacion.classList.add('activo');
        guardarAsientosOcupados(asientosSeleccionados);
        asientosSeleccionados.forEach(idAsiento => {
            
            const butaca = document.querySelector(`[data-asiento="${idAsiento}"]`);
            if (butaca) {
                butaca.classList.remove('seleccionado', 'disponible');
                butaca.classList.add('ocupada');
            }
        });
        asientosSeleccionados = [];
        actualizarResumen();

        document.getElementById('nombre').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('telefono').value = '';
    });
    btnCerrarConfirmacion.addEventListener('click', () => {
        modalConfirmacion.classList.remove('activo');
    });
});