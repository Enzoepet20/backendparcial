// import module/package
const express = require("express");
const morgan = require("morgan");
const app = express();

// setting middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const productoRoute = require("./productoRoutes");
app.use("/producto", productoRoute);


// setting error path
app.use((req, res, next) => {
    const err = new Error(`${req.url} not found in this server`);
    err.status = 404;
    next(err);
});
// setting another error program
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});
// export app
module.exports = app;