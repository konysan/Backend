const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/chat", (req, res) => {  //chat ruta
    res.render("chat");
});

module.exports = router;
