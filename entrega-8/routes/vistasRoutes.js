const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/',(req,res)=>{

    res.status(200).render('home')
})

router.get("/chat", (req, res) => {  // Agregar manejo de la ruta /chat
    res.render("chat");
});

router.get('/registro',(req,res)=>{

    let {error, mensaje} = req.query

    res.status(200).render('registro', {error, mensaje})
})

router.get('/login',(req,res)=>{

    res.status(200).render('login')
})

router.get('/perfil', auth, (req,res)=>{

    let usuario=req.session.usuario

    res.status(200).render('perfil', {usuario})
})

module.exports = router;
