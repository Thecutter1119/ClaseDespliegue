const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db.js");
const supabase = db.getSupabase();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/dishes", async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ error: "Servicio no disponible" });
    const { data, error } = await supabase.from("dishes").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("🔥 Error en GET /api/dishes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST: crear plato
app.post("/api/dishes", async (req, res) => {
  const { name, price } = req.body;
  if (!supabase) return res.status(503).json({ error: "Servicio no disponible" });
  const { data, error } = await supabase
    .from("dishes")
    .insert([{ name, price }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
