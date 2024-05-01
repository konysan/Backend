const passport = require('passport')
const local = require('passport-local');
const github = require('passport-github2')
const { creaHash, validaPassword } = require('../utils.js');
const usersManager = require('../dao/DBmanager/usersManager.js')

const usuariosManager = new usersManager

const initPassport = () => {
    

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField:"email",
                passReqToCallback: true,
                
            },
            async function(req, email , password, done) {
                try {
                    const { first_name, last_name, age, role } = req.body;
                    if (!first_name || !last_name || !email || !age || !password || !role) {
                        return done(null, false, { message: "Todos los campos son obligatorios." });
                    }
                    let existeUsuario = await usuariosManager.getBy({ email });
                    if (existeUsuario) {
                        return done(null, false, { message: "El correo electrónico ya está en uso." });
                    }

                    const hashedPassword = creaHash(password);

                  
                    const nuevoUsuario = await usuariosManager.create({
                        first_name,
                        last_name,
                        email,
                        age,
                        password: hashedPassword,
                        role
                    });
 
                    return done(null, nuevoUsuario)
                   
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (email, password, done) => {
                try {
                    let usuario = await usuariosManager.getBy({ email });
                    if (!usuario) {
                        return done(null, false, { message: "Credenciales incorrectas." });
                    }
    
                    if (!validaPassword(usuario, password)) {
                        return done(null, false, { message: "Credenciales incorrectas." });
                    }
    
                    return done(null, usuario);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
    


    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:"Iv1.f7075f43bf23af68",
                clientSecret:"a15910a620654ad051cdf4b5d632c55d8ddef324",
                callbackURL:"http://localhost:8080/api/sessions/callbackGithub"
            },
            async function(accessToken, refreshToken, profile, done){
                try {
                    let username=profile._json.name
                    let email=profile._json.email
                    if(!email){
                        return done(null, false)
                    }
                    let usuario=await usuariosManager.getBy({email})
                    if(!usuario){
                        usuario=await usuariosManager.create({
                            username, email, 
                            profileGithub: profile
                        })
                    }

                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    

            passport.serializeUser((usuario, done)=> {
                return done(null, usuario._id)
            })

            passport.deserializeUser(async (id, done) => {
                let usuario=await usuariosManager.getBy({_id:id})
                return done(null, usuario)
            })
}

module.exports= initPassport;