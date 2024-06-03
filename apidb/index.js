import express from "express";
const app = express();
import cors from "cors";
import { Clients } from "./models/User.js";
import mongoose from "mongoose";
app.use(cors());
const PORT = 3000;
app.use(express.json());
// npm install mongodb

// Coloque sua chave do MongoDB Abaixo !!!!
mongoose
  .connect(
    "mongodb+srv://danilovinicius1790:kd584mq9ONBq2F9F@cluster0.v08p4gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Banco de dados conectado ! 🚀");
  })
  .catch((error) => {
    console.log("Não foi possivel conectar ao banco de dado.");
  });

// http://localhost:3000/getClients
app.get("/getClients", async (req, res) => {
  const GetUser = await Clients.find();
  return res.status(200).json(GetUser);
});

app.post("/newClient", async (req, res) => {
  try {
    const { name, date, identity, room, value } = req.body;
    const existentUser = await Clients.findOne({ identity: identity });

    if (existentUser) {
      res.status(403).json({ error: "Cliente Já Registrado" });
      return 
    }

    const newUser = await Clients.create({ name, date, identity, room, value });

    const allClients = await Clients.find();
    return res.status(200).json({ AllClients: allClients, newClient: newUser });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: "Ocorreu algum erro ao fazer a postagem" });
  }
});
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
