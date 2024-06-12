const model = require("./index");
const { Op} = require("sequelize");
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const productoData = await model.Producto.findAll();
        if (productoData.length > 0) {
             res
                .status(200)
                .json({ message: "Connection successful", data: productoData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.getID = async function (req, res) {
    try {
        var productoData = await model.Producto.findAll({
        where: { id: { [Op.like]: `%${req.params.id}%` } },
        });
        if (productoData.length > 0) {
            res
            .status(200)
            .json({ message: "Connection successful", data: productoData });
        } else {
        res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.createNewProducto = async function (req, res) {
    try {
        console.log(req.body);
        if (!req.body.nombre || !req.body.precio || !req.body.cantidad || !req.body.categoria) {
            const newProducto = await model.Producto.create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                categoria: req.body.categoria,
            });

            res.status(201).json({
                message: "Producto successfully created",
                data: {
                    id: newProducto.nrodoc,
                    nombre: newProducto.nombre,
                    precio: newProducto.precio,
                    cantidad: newProducto.cantidad,
                    categoria: newProducto.categoria,
                },
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


controller.editAt = async function (req, res) {
    try {
        await model.Producto.findAll({id: { [Op.like]: `%${req.params.id}%` } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.Producto.update(
                       {
                        nombre: req.body.nombre,
                        precio: req.body.precio,
                        cantidad: req.body.cantidad,
                        categoria: req.body.categoria,
                        },
                        { where: { id: req.body.id, } }
                    );
                    res.status(200).json({
                        message: "update successful ashi",
                        data: {
                            nombre: req.body.nombre,
                            precio: req.body.precio,
                            cantidad: req.body.cantidad,
                            categoria: req.body.categoria,
                        },
                    });
                } else {
                    res.status(500).json({ message: "update failed sad" });
                }
            });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.deleteProducto = async function (req, res) {
    try {
        await model.Producto
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
        if (result.length > 0) {
            await model.Producto.destroy({ where: { id: req.body.id } });
            res.status(200).json({ message: "delete producto successfully" });
        } else {
            res.status(404).json({ message: "id user not found" });
            }
        });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

module.exports = controller;