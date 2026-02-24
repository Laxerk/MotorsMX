const autosModel = require("../models/autos.model");

async function obtenerAutos(req, res) {
  try {
    const autos = await autosModel.getAutos();
    res.json(autos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener autos" });
  }
}

module.exports = { obtenerAutos };