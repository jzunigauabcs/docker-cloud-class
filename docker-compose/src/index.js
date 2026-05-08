const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/usuarios", async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM usuarios");
    console.log("Datos obtenidos correctamente!!!");
    return res.status(200).json({ status: 200, data: users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/usuarios", async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son obligatorios" });
  }

  try {
    const sql = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)";
    const result = await db.query(sql, [nombre, email]);
    return res.status(201).json({ id: result.insertId, nombre, email });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
