const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

const sequelize = require('./config/db');
const User = require('./models/User'); 
const Product = require('./models/Product');
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida con éxito.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));
