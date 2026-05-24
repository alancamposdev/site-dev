import express from "express";

const app = express();

app.get('/', (req, res) => { res.send("My backend") })

const PORT = 3000;
app.listen(PORT, () => { console.log(`Servidor rodando: http://localhost:${PORT}`) });