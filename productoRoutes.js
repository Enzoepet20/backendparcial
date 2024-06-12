const express = require("express");
const router = express.Router();
const controller = require("./indexControllerBombero");
router.get("/", controller.Producto.getAll);
router.get("/:id", controller.Producto.getID);
router.post("/", controller.Producto.createNewProducto);
router.put("/:id", controller.Producto.editAt);
router.delete("/", controller.Producto.deleteProducto);


module.exports = router;