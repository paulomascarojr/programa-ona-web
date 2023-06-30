require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const segredo = process.env.SECRETKEY;

 

router.get("/", verificandoJWT, async (req, res) => {
  res.render("./cadastro");
  console.log("Pagina autenticada acima :D")
});

function verificandoJWT(req, res, next) {
  const autorizar = req.cookies.tokenjwt;

  try {
    const decoded = jwt.verify(autorizar, segredo);
    req.senha = decoded.senha;
    next();
  } catch (error) {
    res.render("./return");
  }
}

module.exports = router;
