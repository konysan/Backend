const express = require('express');
const productRoutes = require('./router/cartRoutes.js');
const cartRoutes = require('./router/productRoutes.js');
const handlebars = require('express-handlebars');
const vistaRoutes = require('./routes/vistasRoutes.js');
const { Server } = require('socket.io');
const path = require('path');

const app = express();



const PORT = process.env.PORT || 8080;

let io;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set ('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', vistaRoutes);
app.use('/onlineproducts', vistaRoutes);


app.get('*', (req, res) => {
    res.status(404).send("error 404, not found.");
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


io = new Server(app.listen(8000, () => {
    console.log('Servidor corriendo en el puerto 8000');           
}
));

const productManager = require('./product-manager');

io.on("connection", (socket) => {
    console.log("Usuario conectado");

    // Manejar evento 'getProducts'
    io.on('connection', (socket) => {
        socket.on('addProduct', (productName) => {
            
            io.emit('productAdded', productName);
        });

        socket.on('deleteProduct', (productId) => {

            io.emit('productDeleted', productId);
        });
    });
}
);
  