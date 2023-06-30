require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const Port = process.env.PORT;
const path = require('path');

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const login = require("./login");
const register = require("./register")
const user = require("./user");

app.use("/", login);
app.use("/register", register)
app.use("/user", user);

app.get("/", async function (req, res) {
  const filePath = path.join(__dirname, 'home.html');
  res.sendFile(filePath);
})
app.get("/titulo", async function (req, res) {
  const filePath1 = path.join(__dirname, 'titulos.html');
  res.sendFile(filePath1); 
})
app.get("/temporada", async function (req, res) {
  const filePath2 = path.join(__dirname, 'temporada.html');
  res.sendFile(filePath2); 
})
app.get("/historia", async function (req, res) {
  const filePath3 = path.join(__dirname, 'historia.html');
  res.sendFile(filePath3); 
})

app.listen(8030, function () {
  console.log(`Servidor aberto na porta 8030`);
});
