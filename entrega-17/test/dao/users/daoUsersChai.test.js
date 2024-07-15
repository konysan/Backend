const config = require("../../../src/config/config");
const UsuariosMongoDAO = require("../../../src/dao/usersMongoDAO");
const mongoose = require("mongoose");

let expect;

describe("Pruebas al DAO de Users usando Chai", function() {
    this.timeout(8000); // Por defecto es de 2000 ms

    let usuariosMongoDAO;

    before(async function() {
        // Importar expect de Chai usando import()
        const chai = await import('chai');
        expect = chai.expect;

        // Inicializar la conexión a la base de datos antes de las pruebas
        try {
            await mongoose.connect("mongodb+srv://konradmocken:konykony@cluster0.tg4ryzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }

        // Inicializar la instancia de UsuariosMongoDAO
        usuariosMongoDAO = new UsuariosMongoDAO();
    });

    beforeEach(async function() {
        // Limpiar la colección de usuarios antes de cada prueba
        await mongoose.connection.collection("users").deleteMany({ email: "juanperez@test.com" });
    });

    it("El método getAll del DAO retorna un arreglo de usuarios", async function() {
        let resultado = await usuariosMongoDAO.getAll();

        expect(Array.isArray(resultado)).to.be.equal(true);
        expect(resultado).to.be.an('array');

        if (Array.isArray(resultado) && resultado.length > 0) {
            console.log(resultado);
            expect(resultado[0]._id).to.exist;
            expect(resultado[0]).to.have.property("_id");
            expect(resultado[0]).to.have.property("email");
            expect(resultado[0]).to.have.property("email").that.is.a('string');
        }
    });

    it('El método create permite grabar un user en DB', async function() {
        let mockUser = {
            first_name: "Luis",
            last_name: "Rios",
            email: "luisrios@test.com",
            password: "123123",
            age: 45,
            role: "user"
        };

        let resultado = await mongoose.connection.collection("users").findOne({ email: "luisrios@test.com" });

        expect(resultado).to.be.equal(null);
        expect(resultado).to.be.null;

        resultado = await usuariosMongoDAO.create(mockUser);

        expect(resultado._id).to.exist;
        expect(resultado._id).to.be.ok;
        expect(resultado.toJSON()).to.haveOwnProperty("_id");
    });
});
