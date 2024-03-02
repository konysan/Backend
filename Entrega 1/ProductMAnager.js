class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log("Producto con el mismo código ya existe");
      return;
    }

    const id = this.productIdCounter++;
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      return this.products[productIndex];
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1);
      return deletedProduct[0];
    } else {
      throw new Error("Producto no encontrado");
    }
  }
}

// Ejemplo de uso:
const productManager = new ProductManager();

const addedProduct = productManager.addProduct(
  "Harina",
  "Blancaflor",
  200,
  "Sin imagen",
  "abc123",
  50
);
console.log("Producto agregado:", addedProduct);

console.log(productManager.getProducts());

try {
  const productId = addedProduct.id;
  const foundProduct = productManager.getProductById(productId);
  console.log("Producto encontrado por ID:", foundProduct);
} catch (error) {
  console.error(error.message);
}

try {
  const updatedProduct = productManager.updateProduct(addedProduct.id, {
    price: 250,
    description: "Favorita",
  });
  console.log("Producto actualizado:", updatedProduct);
} catch (error) {
  console.error(error.message);
}

try {
  const deletedProduct = productManager.deleteProduct(addedProduct.id);
  console.log("Producto eliminado:", deletedProduct);
} catch (error) {
  console.error(error.message);
}
