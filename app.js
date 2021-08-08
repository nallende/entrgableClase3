const fs = require("fs");
const express = require("express");

const modulo = require("./contenedor.js");

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function desplegarLista(req, res) {
  modulo.objects;
  res.send(getAll("./src/productos.txt"));
}

function desplegarRandom(req, res) {
  modulo.random.getAll("./src/productos.txt");
  res.send();
}

app.listen(port, () => {
  console.log(`Se esta usando Puerto :${port}`);
});
