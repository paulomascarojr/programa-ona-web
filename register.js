const express = require("express");
const router = express.Router();
const aleatorio = require("./db/db");
const bcrypt = require("bcrypt");


router.get("/", async function (req, res) {
  res.render("./cadastro");
});

router.post("/register", async function (req, res) {

  await aleatorio.Post.sync();
  
  const random = await bcrypt.genSalt(12)
  passwordHash = await bcrypt.hash(req.body.senha,random);

  const aprender = await aleatorio.Post.create({
    nome_usuario: req.body.usuario,
    senha: passwordHash,
  })
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
      res.render("./return");
    });
});

module.exports = router
