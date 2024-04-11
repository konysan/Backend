const express = require('express');
const router = express.Router();
const usersManager = require('../dao/DBmanager/usersManager.js')
const { creaHash } = require('../utils.js');
const bcrypt = require('bcrypt')

let usuariosManager= new usersManager()

router.post('/registro', async (req, res) => {

    let { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Faltan datos` });
    }

    let existe = await usuariosManager.getBy({ email });
    if (existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ya existen usuarios con email ${email}` });
    }

    try {
        password = await creaHash(password);
    } catch (error) {
        console.error('Error:', error);
        return res.redirect(`/registro?error=Error 500 - error inesperado`);
    }

    try {
        let nuevoUsuario = await usuariosManager.create({ username, email, password, role });
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: "Registro exitoso", nuevoUsuario });
    } catch (error) {
        console.error('Error:', error);
        return res.redirect(`/registro?error=Error 500 - error inesperado`);
    }

});




router.post('/login',async(req,res)=>{

    let {email, password} =req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos`})
    }

    let usuario=await usuariosManager.getBy({email})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

    if(bcrypt.compareSync(password, usuario.password)){
        usuario={...usuario}
        delete usuario.password
        req.session.usuario=usuario // en un punto de mi proyecto

        res.setHeader('Content-Type','application/json')
        res.status(200).json({
            message:"Login correcto", usuario
        })
    } else {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

})




router.get('/logout',(req,res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${e.message}`
                }
            )
            
        }
    })
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        message:"Logout exitoso"
    });
});


module.exports = router;