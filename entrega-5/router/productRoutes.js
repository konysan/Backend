const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager.js');

const productManager = new ProductManager('products.json');

router.get('/', (req, res) => {
    const products = productManager.getAllProducts();
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


router.post('/', (req, res) => {
    const productManager = new ProductManager('products.json');
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !Array.isArray(thumbnails)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben tener el tipo correcto.' });
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    productManager.addProduct(newProduct);

    res.status(201).json({ message: 'Producto agregado correctamente', newProduct });
});

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !Array.isArray(thumbnails)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben tener el tipo correcto.' });
    }

    const updatedProduct = {
        id: productId, 
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    const result = productManager.updateProduct(updatedProduct);

    if (result) {
        res.json({ message: 'Producto actualizado correctamente', updatedProduct });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const result = productManager.deleteProductById(productId);

    if (result) {
        res.json({ message: 'Producto eliminado correctamente' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;