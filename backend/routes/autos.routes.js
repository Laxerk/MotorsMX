const express = require("express");
const router = express.Router();
const autosController = require("../controllers/autos.controller");

router.get("/", autosController.obtenerAutos);

module.exports = router;