const db = require('./database');
require('dotenv').config({ path: './a.env' })
const Producto = require('./models/producto');
const { Model } = require('sequelize');
const model = {};



db.sync({ force: true })
  .then(() => {
    console.log('Tablas creadas correctamente.');
  })
  .catch((err) => {
    console.error('Error al crear las tablas:', err);
  });

model.Producto = Producto;
module.exports = model;
