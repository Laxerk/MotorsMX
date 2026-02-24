require("dotenv").config();
const express = require("express");
const cors = require("cors");
const autosRoutes = require("./routes/autos.routes");
const cotizacionesRoutes = require("./routes/cotizaciones.routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/autos", autosRoutes);

app.use("/api/cotizaciones", cotizacionesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});