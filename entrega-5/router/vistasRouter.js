const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager.js');

const productManager = new ProductManager('products.json');

router.get("/", (req, res) => {
    const products = productManager.getAllProducts();
    res.render("index", { products });
});

router.get("/onlineproducts", (req, res) => {
    const products = productManager.getAllProducts();
    res.render("onlineProducts", { products });
});

module.exports = router;