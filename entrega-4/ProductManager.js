const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.productIdCounter = 1;
        this.loadFromFile();
    }

    generateUniqueId() {
        let highestId = 0;
    
        const products = this.getAllProducts();
    
        products.forEach(product => {
            if (product.id > highestId) {
                highestId = product.id;
            }
        });
    
        return highestId + 1;
    }
    
    
    addProduct(productData) {
        if (!productData.title || !productData.description || !productData.code || !productData.price || !productData.status || !productData.stock || !productData.category || !productData.thumbnails) {
            console.log("Todos los campos son obligatorios.");
            return;
        }
    
        const existingProduct = this.getProductByCode(productData.code);
        if (existingProduct) {
            console.log(`Ya existe un producto con el código '${productData.code}'.`);
            return;
        }
    
        productData.id = this.generateUniqueId(); // Asigna el ID generado al producto
        this.saveToFile(productData);
        console.log(`Producto '${productData.title}' agregado correctamente.`);
    }

    getProductByCode(code) {
        const products = this.getAllProducts();
        return products.find(product => product.code === code);
    }

    getAllProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al cargar productos desde archivo:', error.message);
            return [];
        }
    }

    getProductById(id) {
        const products = this.getAllProducts();
        const product = products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado.");
            return null;
        }
    }

    saveToFile(productData) {
        try {
            let products = this.getAllProducts();
            products.push(productData);
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
            console.log('Producto guardado en archivo.');
        } catch (error) {
            console.log('Error al guardar producto en archivo:', error.message);
        }
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            console.log('Productos cargados desde archivo.');
        } catch (error) {
            console.log('Error al cargar productos desde archivo:', error.message);
            this.products = []; 
        }
    }
    deleteProductById(id) {
        let products = this.getAllProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
            console.log('Producto eliminado del archivo.');
        } else {
            console.log('Producto no encontrado.');
        }
    }
    updateProduct(updatedProduct) {
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
    
        if (index !== -1) {
            this.products[index] = updatedProduct;
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            return true;
        } else {
            return false; // Producto no encontrado
        }
    }

}

const manager = new ProductManager('products.json');

manager.addProduct({
    title: "Harina",
    description: "0000 BlancaFlor",
    code: "abc123",
    price: 2000,
    status: true,
    stock: 55, 
    category: "Harina",
    thumbnails: ["harina.jpg"], 
});

manager.addProduct({
    title: "Fideos",
    description: "Marolio",
    code: "abc124",
    price: 100,
    status: true,
    stock: 40, 
    category: "Fideos",
    thumbnails: ["Fideos.jpg"], 
});

manager.addProduct({
    title: "Azucar",
    description: "Ledezma",
    code: "abc125",
    price: 450,
    status: true,
    stock: 25, 
    category: "Azucar",
    thumbnails: ["Azucar.jpg"], 
});


module.exports = ProductManager;