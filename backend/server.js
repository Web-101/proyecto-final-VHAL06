const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const peliculas = [
    {
        id: 1,
        titulo: 'El Día del Fin del Mundo',
        genero: ['Suspenso', 'Acción'],
        claseGenero: ['suspenso', 'accion'],
        clasificacion: '12+',
        duracion: 119,
        puntuacion: 6.4,
        reparto: ['Gerard Butler', 'Morena Baccarin', 'Roger Dale Floyd', 'Scott Glenn', 'David Denman'],
        poster: 'https://scz.megacenter.com.bo/wp-content/uploads/2020/12/dia-del-fin-del-mundo-191x300.jpg',
        sinopsis: 'Una familia lucha por sobrevivir mientras un cometa que mata planetas se dirige hacia la Tierra. John Garrity, su esposa distanciada Allison y su hijo Nathan deben atravesar un país sumido en el caos para llegar a un búnker secreto en Groenlandia. Con el reloj corriendo y la civilización colapsando a su alrededor, deberán enfrentar no solo la destrucción inminente, sino también lo peor de la humanidad: el pánico, el saqueo y la desesperación. Una carrera contra el apocalipsis donde la esperanza es lo único que no pueden permitirse perder.',
        tipo: 'cartelera',
        funciones: ['13:00', '15:30', '18:00', '20:30'],
        trailer: 'https://www.youtube.com/watch?v=jI9_pU-TrV8'
    },
    {
        id: 2,
        titulo: 'La Isla Olvidada',
        genero: ['Fantasía', 'Aventura'],
        claseGenero: ['fantasia', 'aventura'],
        clasificacion: '4+',
        duracion: 98,
        puntuacion: 8.6,
        reparto: ['H.E.R.', 'Liza Soberano', 'Dave Franco', 'Jenny Slate', 'Manny Jacinto'],
        poster: 'https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/1045.jpg',
        sinopsis: 'Dos mejores amigos quedan varados en el místico mundo de Nakali, una isla oculta entre dimensiones donde la realidad se dobla y los recuerdos cobran vida. Para escapar, deberán atravesar paisajes imposibles, resolver acertijos ancestrales y enfrentarse a criaturas que solo existían en sus sueños. Pero el verdadero desafío no será encontrar la salida, sino aceptar que uno de ellos deberá sacrificar todos sus recuerdos compartidos para que el otro pueda regresar a casa. Una aventura de fantasía y comedia que explora el valor de la amistad y el precio de los recuerdos.',
        tipo: 'cartelera',
        funciones: ['14:00', '16:30', '19:00'],
        trailer: 'https://www.youtube.com/watch?v=8cI5Bl-v-p8'
    },
    {
        id: 3,
        titulo: 'Scream',
        genero: ['Terror', 'Suspenso'],
        claseGenero: ['terror', 'suspenso'],
        clasificacion: '18+',
        duracion: 114,
        puntuacion: 6.3,
        reparto: ['Neve Campbell', 'Courteney Cox', 'David Arquette', 'Melissa Barrera', 'Jenna Ortega'],
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxJYlJfqRmDiXc2hNZC-4__fFilizJNj7CYA9J_4r48zst9SHSvSKFAA3a&s=10',
        sinopsis: 'Veinticinco años después de los brutales asesinatos que sacudieron Woodsboro, un nuevo asesino con la icónica máscara de Ghostface emerge de las sombras. Esta vez, los crímenes están conectados con el oscuro pasado del pueblo y secretos que nunca debieron salir a la luz. Sidney Prescott, Gale Weathers y Dewey Riley deberán regresar para enfrentar una nueva ola de terror que golpea más cerca que nunca. En un mundo donde todos son sospechosos y las reglas del horror han cambiado, la pregunta ya no es quién será la próxima víctima, sino quién está detrás de la máscara esta vez.',
        tipo: 'cartelera',
        funciones: ['13:00', '15:30', '18:00', '20:30'],
        trailer: 'https://www.youtube.com/watch?v=WZXCpje7ZNo'
    },
    {
        id: 4,
        titulo: 'Super Girl',
        genero: ['Acción', 'Aventura'],
        claseGenero: ['accion', 'aventura'],
        clasificacion: '12+',
        duracion: 108,
        puntuacion: 6.1,
        reparto: ['Milly Alcock', 'David Corenswet', 'Eve Ridley', 'Matthias Schoenaerts'],
        poster: 'https://sacnkprodarcms.blob.core.windows.net/content/posters/HO00012448.jpg',
        sinopsis: 'Antes de que Superman se convirtiera en el símbolo de esperanza de la Tierra, su prima Kara Zor-El vagaba sola por el universo. Tras la destrucción de Krypton, la joven kryptoniana llega a un planeta hostil donde descubre que sus poderes la convierten en objetivo. Perseguida por cazadores intergalácticos y atormentada por la culpa de haber sobrevivido, Kara emprende un viaje interestelar de venganza y justicia. Pero cuando un adversario cósmico amenaza con desatar el caos en la galaxia, Supergirl deberá decidir entre sucumbir a la ira o convertirse en la heroína que su primo siempre supo que podía ser.',
        tipo: 'cartelera',
        funciones: ['14:00', '16:30', '19:00', '21:00'],
        trailer: 'https://www.youtube.com/watch?v=nMSMaagat8o'
    },
    {
        id: 5,
        titulo: 'Spider Man 4',
        genero: ['Acción', 'Aventura'],
        claseGenero: ['accion', 'aventura'],
        clasificacion: '8+',
        duracion: 145,
        puntuacion: 9.4,
        reparto: ['Tom Holland', 'Zendaya', 'Sadie Sink', 'Jacob Batalon', 'Jon Bernthal'],
        poster: 'https://sacnkprodbocms.blob.core.windows.net/content/posters/HO00004444.jpg',
        sinopsis: 'Tras los eventos que sacudieron el multiverso, Peter Parker intenta dejar atrás su vida como Spider-Man para concentrarse en la universidad. Pero la paz dura poco. Una nueva amenaza surge de las sombras de Nueva York, obligándolo a romper su promesa y enfundarse el traje una vez más. Con nuevos aliados inesperados y enemigos que conocen sus secretos más oscuros, Peter descubrirá que la mayor batalla no se libra en los tejados, sino dentro de sí mismo. Porque ser Spider-Man no es una elección, es un destino. Y esta vez, el precio de la responsabilidad podría ser demasiado alto.',
        tipo: 'cartelera',
        funciones: ['13:00', '15:30', '18:00', '20:30'],
        trailer: 'https://www.youtube.com/watch?v=pqLSLoDkZWE'
    },
    {
        id: 6,
        titulo: 'Toy Story 5',
        genero: ['Infantil', 'Aventura'],
        claseGenero: ['infantil', 'aventura'],
        clasificacion: '4+',
        duracion: 102,
        puntuacion: 7.5,
        reparto: ['Tom Hanks', 'Tim Allen', 'Joan Cusack'],
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZO9F5-O60Edr567u_-2EpmxRXM8HGOO1v6qP12Z6BgNOjaz0BfSKoizM&s=10',
        sinopsis: 'Woody, Buzz, Jessie y el resto de la pandilla enfrentan su mayor crisis existencial cuando Bonnie recibe una tableta inteligente llamada Lilypad. Los juguetes tradicionales quedan relegados al olvido mientras la niña se sumerge en un mundo digital que amenaza con extinguir el juego físico para siempre. Decididos a no desaparecer sin luchar, los juguetes trazan un plan para recordarle a Bonnie el valor de la imaginación. Pero en el camino descubrirán que la verdadera amenaza no es la tecnología, sino el miedo a ser olvidados. Una aventura que celebra la amistad, el cambio y el poder eterno del juego.',
        tipo: 'cartelera',
        funciones: ['14:00', '16:30', '19:00'],
        trailer: 'https://www.youtube.com/watch?v=s_qpMMkvHYE'
    },
    {
        id: 7,
        titulo: 'Cómo Entrenar a tu Dragón',
        genero: ['Fantasía', 'Aventura','Estreno'],
        claseGenero: ['fantasia', 'aventura','estreno'],
        clasificacion: '4+',
        duracion: 125,
        puntuacion: 7.7,
        reparto: ['Mason Thames', 'Nico Parker', 'Gerard Butler', 'Nick Frost'],
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTfJXssId8DW2QtrUVrdZ176w7KV6yMIshZEMX6FxOO_-FojWIg2atg6U&s=10',
        sinopsis: 'En la isla de Berk, los vikingos han cazado dragones durante generaciones. Hipo, el hijo del jefe Estoico, sueña con demostrar su valía como guerrero. Pero todo cambia cuando captura a un Furia Nocturna, el dragón más temido de todos, y en lugar de matarlo, forja una amistad imposible con la criatura. A medida que su vínculo crece, Hipo descubre que los dragones no son las bestias salvajes que todos creen, y que la verdadera batalla no es contra ellos, sino contra siglos de odio y malentendidos. Con la ayuda de Chimuelo, Hipo deberá demostrar que el coraje no está en la fuerza, sino en tender la mano al diferente.',
        tipo: 'estreno',
        funciones: ['13:00', '15:30', '18:00', '20:30'],
        trailer: 'https://www.youtube.com/watch?v=liGB1ssYn38'
    },
    {
        id: 8,
        titulo: 'Alien Rómulos',
        genero: ['Terror', 'Ciencia Ficción','Estreno'],
        claseGenero: ['terror', 'cficcion','estreno'],
        clasificacion: '18+',
        duracion: 119,
        puntuacion: 7.1,
        reparto: ['Cailee Spaeny', 'David Jonsson', 'Archie Renaux', 'Isabela Merced'],
        poster: 'https://ae01.alicdn.com/kf/Sead9974f6ce94658920d6a58851b8f24d/A-Alien-Romulus-Movie-Sci-fi-Horror-New-Monster-Sci-fi-Film-Poster-Print-Wall-Art.jpg',
        sinopsis: 'Mientras exploran las profundidades de una estación espacial abandonada, un grupo de jóvenes colonos espaciales despierta algo que debió permanecer dormido. En los corredores oscuros y las cámaras criogénicas oxidadas, una forma de vida perfecta acecha en las sombras: un organismo diseñado para matar. Sin comunicación con el exterior y con sus suministros agotándose, el grupo deberá improvisar, luchar y sacrificarse para sobrevivir. Pero en el espacio, nadie puede oír tus gritos. Y en esta estación, el silencio es la antesala de la muerte. Ambientada entre los eventos de Alien y Aliens.',
        tipo: 'estreno',
        funciones: ['14:00', '16:30', '19:00'],
        trailer: 'https://www.youtube.com/watch?v=5nWH2Pd-x-c'
    },
    {
        id: 9,
        titulo: 'Scary Movie 4',
        genero: ['Comedia','Estreno'],
        claseGenero: ['comedia','estreno'],
        clasificacion: '17+',
        duracion: 83,
        puntuacion: 5.1,
        reparto: ['Anna Faris', 'Regina Hall', 'Craig Bierko', 'Bill Pullman'],
        poster: 'https://uvn-brightspot.s3.amazonaws.com/assets/vixes/s/scary-movie-4-poster.jpg',
        sinopsis: 'Cindy Campbell regresa más desventurada que nunca. Mientras investiga la misteriosa muerte de su vecino, descubre que su casa está habitada por el espíritu de un niño con una agenda muy pendiente. Por si fuera poco, una invasión alienígena está en marcha y los extraterrestres tienen planes muy extraños para la humanidad. Entre exorcismos fallidos, parodias de las películas más taquilleras de Hollywood y encuentros con viejos conocidos, Cindy deberá salvar el mundo sin perder la poca dignidad que le queda. Una comedia absurda donde nada tiene sentido y todo está permitido, incluso reírse del fin del mundo, Tempura- Sushi- SASHIMIIII!.',
        tipo: 'estreno',
        funciones: ['13:00', '15:30', '18:00', '20:30'],
        trailer: 'https://www.youtube.com/watch?v=nXcqlv9EB6c'
    },
    {
        id: 10,
        titulo: 'Redeeming Love',
        genero: ['Romance', 'Acción','Estreno'],
        claseGenero: ['romance', 'accion','estreno'],
        clasificacion: '18+',
        duracion: 134,
        puntuacion: 6.8,
        reparto: ['Abigail Cowen', 'Tom Lewis', 'Eric Dane', 'Famke Janssen', 'Logan Marshall-Green'],
        poster: 'https://m.media-amazon.com/images/I/616URZkBJEL._AC_UF894,1000_QL80_.jpg',
        sinopsis: 'En la California de 1850, durante la fiebre del oro, Angel ha conocido solo el lado más cruel de la humanidad. Vendida a la prostitución siendo apenas una niña, su corazón está blindado contra el amor y la esperanza. Hasta que Michael Hosea, un granjero guiado por una fe inquebrantable, recibe un mensaje divino: casarse con ella y amarla incondicionalmente. Lo que sigue es una historia de redención que desafía todas las convenciones. Angel deberá aprender a confiar nuevamente, mientras Michael descubre que el amor verdadero no exige, espera. Una épica historia de amor, perdón y segundas oportunidades. Basada en la novela de Francine Rivers.',
        tipo: 'estreno',
        funciones: ['14:00', '16:30', '19:00', '21:00'],
        trailer: 'https://www.youtube.com/watch?v=6Z-0C02cqFo'
    },
    {
        id: 11,
        titulo: 'Deadpool & Wolverine',
        genero: ['Romance', 'Acción','Comedia','Ciencia ficcion'],
        claseGenero: ['romance', 'accion','comedia', 'cficcion'],
        clasificacion: '18+',
        duracion: 124,
        puntuacion: 9.8,
        reparto: ['Ryan Reynols', 'Huge Hackman'],
        poster: 'https://lumiere-a.akamaihd.net/v1/images/tidalwave_payoff_poster_las_0a47c6a2.jpeg',
        sinopsis: 'La apacible vida civil de Wade Wilson (Deadpool) se ve interrumpida cuando la Autoridad de Variación Temporal (TVA) lo arresta. El agente Paradox le revela que su universo está condenado a extinguirse porque su "ser ancla" (Wolverine) ha muerto. Desesperado por salvar su mundo, Deadpool viaja por el multiverso para reclutar a un nuevo Wolverine y detener la destrucción.',
        tipo: 'cartelera',
        funciones: ['12:00', '13:30', '14:00', '22:00'],
        trailer: 'https://www.youtube.com/watch?v=UzFZR2dRsSY&pp=ygUUZGVhZHBvb2wgJiB3b2x2ZXJpbmU%3D'
    },
    {
        id: 12,
        titulo: 'RAMPAGE',
        genero: ['Acción','Comedia','Ciencia ficcion'],
        claseGenero: ['accion','comedia', 'cficcion'],
        clasificacion: '12+',
        duracion: 144,
        puntuacion: 5.8,
        reparto: ['Dwayne Johnson'],
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1uacQ3ZIIHdZO2ioXoyYwJwJsxivjeSE-AVRGfx9_dWWQ6c3pnBl_x_A&s=10',
        sinopsis: 'Una extraña sustancia convierte a tres animales en enormes y peligrosas bestias, y un científico debe encontrar un antídoto para la mutación antes de que destruyan todo.',
        tipo: 'cartelera',
        funciones: ['12:00', '13:30', '14:00', '22:00'],
        trailer: 'https://www.youtube.com/watch?v=coOKvrsmQiI&pp=ygUPcmFtcGFnZSB0cmFpbGVy0gcJCU8LAYcqIYzv'
    }
];

app.get('/api/cartelera', (req, res) => {
    res.json(peliculas);
});

app.get('/api/cartelera/:id', (req, res) => {
    const pelicula = peliculas.find(p => p.id === parseInt(req.params.id));
    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ error: 'Película no encontrada' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
