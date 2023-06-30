require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const aleatorio = require("./db/db");
const segredo = process.env.SECRETKEY;
const bcrypt = require("bcrypt");


router.get("/login", async function (req, res) {
  res.render("./login");
});
router.post("/send", async function (req, res) {
  const nome_usuario = req.body.nome;
  const senha = req.body.senha;
  try {
    const user = await aleatorio.Post.findOne({ where: { nome_usuario } });

    if (!user) {
      res.render("./return");
    } else {
      const verify = await bcrypt.compare(senha, user.senha);
      if (verify) {
        const autorizando = jwt.sign(
          {
            nome: nome_usuario,
          },
          segredo,
          { expiresIn: 60 }
        );
        res.cookie("tokenjwt", autorizando, { maxAge: 55000, httpOnly: true });
        return res.redirect("/user");
      } else {
        res.render("./return");
      }
    }
  } catch (error) {
    res.render("./return");
  }
});
module.exports = router;
