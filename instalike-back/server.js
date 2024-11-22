// importa a biblioteca express, que ser  utilizada para criar o servidor
import express from "express";
import routes from "./src/routes/postRoutes.js";

// cria o servidor
const app = express();
app.use(express.static("uploads"));

routes(app);

// coloca o servidor para rodar na porta 3000 e imprime mensagem de sucesso
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

// cria uma rota para a raiz do servidor, que retorna uma mensagem de ol  mundo
app.get("/", (req, res) => {
  res.status(200).send("ola  mundo");
});

