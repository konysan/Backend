const express = require('express');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/carts', cartRoutes);

app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});