const express = require("express");
const router = express.Router();
const controller = require("../controllers/cotizaciones.controller");

router.post("/", controller.crear);

module.exports = router;