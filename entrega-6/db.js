const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://konradmocken:konykony@cluster0.tg4ryzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{dbName:"ecommerse"});
        console.log("DB Online...!!!");
    } catch (error) {
        console.log("Fallo conexión. Detalle:", error.message);
    }
};

module.exports = connect;
