const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: String,
    thumbnails: [String],
    owner: { type: String, default: 'admin' }  // Campo para almacenar el correo electrónico del propietario
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

