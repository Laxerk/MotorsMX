const supabase = require("../config/supabase");

async function getAutos() {
  const { data, error } = await supabase
    .from("autos")
    .select("*");

  if (error) throw error;

  return data;
}

module.exports = { getAutos };