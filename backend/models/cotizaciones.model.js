const supabase = require("../config/supabase");

async function crearCotizacion(body) {
  const { data, error } = await supabase
    .from("cotizaciones")
    .insert([
      {
        auto_id: body.auto_id,
        nombre: body.nombre_cliente,
        email: body.email,
        telefono: body.telefono,
        enganche: body.enganche,
        plazo: body.plazo_meses,
        mensualidad: body.pago_mensual
      }
    ])
    .select();

  if (error) throw error;

  return data;
}

module.exports = {
  crearCotizacion,
};