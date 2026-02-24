const Cotizacion = require("../models/cotizaciones.model");

async function crear(req, res) {
  try {
    const cotizacion = await Cotizacion.crearCotizacion(req.body);
    res.status(201).json(cotizacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar cotización" });
  }
}

module.exports = {
  crear,
};