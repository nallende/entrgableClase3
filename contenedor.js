"use strict";

console.clear();

const fs = require("fs");

class Producto {
  constructor([{ id, name, imageUrl, price }]) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
  }
}

const pt1 = {
  name: "Brown Brim",
  imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
  price: 25,
};

const pt2 = {
  name: "Blue Beanie",
  imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
  price: 18,
};

const pt3 = {
  name: "Brown Cowboy",
  imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
  price: 35,
};

module.exports = class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.id = 0;
    this.data = [];
  }

  //Metodo Crear o Guardar
  async save(obj) {
    await this.getAll();
    this.id++;
    this.data.push({
      id: this.id,
      product: obj,
    });
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));
    } catch (e) {
      console.error("Este es el err save " + e);
    }
  }
  async getbyId(id) {
    let objs = await this.getAll();
    let index = await objs.filter((elemento) => elemento.id === id);
    try {
      return index;
    } catch (e) {
      console.error("Este es el err getById " + e);
      return;
    }
  }

  async deleteById(id) {
    const objs = await this.getAll();
    const index = objs.findIndex((o) => o.id === id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`);
    }

    objs.splice(index, 1);
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(objs, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  //metodo leer todo
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");

      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
  //Metodo borrar todo
  async deleteAll(archivo) {
    try {
      await fs.promises.unlink(archivo);
    } catch (error) {
      console.log(error);
    }
  }
};
