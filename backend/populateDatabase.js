import Product from './models/Product.js';
import sequelize from './config/database.js';

// Asegúrate de que la conexión y el modelo están sincronizados
sequelize.sync().then(() => {
    console.log('Conexión establecida y modelo sincronizado');
});

const productos = [
    [
        {
            nombre: "Ficus Lyrata",
            descripcion: "Planta de interior de gran tamaño con hojas grandes y verdes.",
            precio: 45990,
            imagen: "https://tinypic.host/image/X69gm",
            stock: 10
        },
        {
            nombre: "Succulenta Echeveria",
            descripcion: "Pequeña planta suculenta, perfecta para escritorios o ventanas soleadas.",
            precio: 8500,
            imagen: "https://tinypic.host/image/X6fwO",
            stock: 20
        },
        {
            nombre: "Monstera Deliciosa",
            descripcion: "Planta tropical con hojas grandes y perforadas, ideal para interiores.",
            precio: 30000,
            imagen: "https://tinypic.host/image/X6ujM",
            stock: 15
        },
        {
            nombre: "Palmera Areca",
            descripcion: "Planta de interior que purifica el aire, perfecta para salas de estar.",
            precio: 55000,
            imagen: "https://tinypic.host/image/X6Pmk",
            stock: 5
        },
        {
            nombre: "Cactus San Pedro",
            descripcion: "Cactus de rápido crecimiento, ideal para exteriores soleados.",
            precio: 20000,
            imagen: "https://tinypic.host/image/X6kex",
            stock: 12
        },
        {
            nombre: "Helecho Boston",
            descripcion: "Planta de interior con frondosas hojas verdes, ideal para colgar.",
            precio: 25000,
            imagen: "https://tinypic.host/image/X6X9H",
            stock: 10
        },
        {
            nombre: "Orquídea Phalaenopsis",
            descripcion: "Elegante orquídea con flores duraderas, ideal para regalo.",
            precio: 35990,
            imagen: "https://tinypic.host/image/X6N3e",
            stock: 7
        },
        {
            nombre: "Bonsái Junípero",
            descripcion: "Pequeño árbol bonsái, perfecto para la decoración de interiores.",
            precio: 50000,
            imagen: "https://tinypic.host/image/X6I7u",
            stock: 4
        },
        {
            nombre: "Dracaena Marginata",
            descripcion: "Planta alta con hojas finas y alargadas, ideal para oficinas.",
            precio: 40000,
            imagen: "https://tinypic.host/image/X6H1X",
            stock: 6
        },
        {
            nombre: "Aloe Vera",
            descripcion: "Planta suculenta conocida por sus propiedades curativas.",
            precio: 12000,
            imagen: "https://tinypic.host/image/X6nhB",
            stock: 20
        },
        {
            nombre: "Poto Dorado",
            descripcion: "Planta trepadora con hojas en forma de corazón, ideal para interiores.",
            precio: 18000,
            imagen: "https://tinypic.host/image/X6lF9",
            stock: 15
        },
        {
            nombre: "Crisantemo",
            descripcion: "Flor colorida y vistosa, ideal para jardines y macetas.",
            precio: 9500,
            imagen: "https://tinypic.host/image/X6Zmb",
            stock: 30
        },
        {
            nombre: "Lavanda",
            descripcion: "Planta aromática con flores moradas, ideal para exteriores soleados.",
            precio: 15000,
            imagen: "https://tinypic.host/image/X6qk5",
            stock: 12
        },
        {
            nombre: "Rosa Miniatura",
            descripcion: "Pequeña rosa en maceta, perfecta para balcones y terrazas.",
            precio: 20000,
            imagen: "https://tinypic.host/image/X6YpE",
            stock: 8
        },
        {
            nombre: "Planta Serpiente",
            descripcion: "Planta resistente, ideal para principiantes y espacios con poca luz.",
            precio: 22000,
            imagen: "https://tinypic.host/image/X61XQ",
            stock: 10
        },
        {
            nombre: "Planta de Jade",
            descripcion: "Suelculenta con hojas gruesas, simboliza suerte y prosperidad.",
            precio: 18500,
            imagen: "https://tinypic.host/image/X6K9a",
            stock: 20
        },
        {
            nombre: "Begonia Maculata",
            descripcion: "Planta con hojas llamativas, ideal para dar un toque único a interiores.",
            precio: 27000,
            imagen: "https://tinypic.host/image/X6E3d",
            stock: 7
        },
        {
            nombre: "Cactus Cola de Mono",
            descripcion: "Cactus de crecimiento rápido y único, ideal para coleccionistas.",
            precio: 30000,
            imagen: "https://tinypic.host/image/X6Uzw",
            stock: 5
        },
        {
            nombre: "Zamioculcas",
            descripcion: "Planta de fácil cuidado, ideal para oficinas y hogares modernos.",
            precio: 35000,
            imagen: "https://tinypic.host/image/X6S1v",
            stock: 8
        }
    ]
];

Product.bulkCreate(productos)
    .then(() => console.log('Productos añadidos con éxito'))
    .catch(error => console.error('Error al añadir productos:', error));