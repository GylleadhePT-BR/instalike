import express from "express";
import multer from "multer";
import {listarPosts , criarPosts , uploudImagem , updateNewPost} from "../controller/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}


// a constante storage é uma função que define como o multer vai comportar
// em relação ao destino e ao nome dos arquivos que ser o uplodados
// no caso, estamos usando o multer para uplodar imagens na pasta "public/imagens"
// e o nome do arquivo vai ser o nome original do arquivo que foi uplodado
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploud = multer({dest: "./uploads" , storage});

 

const routes = (app) => {

  // permite que o servidor entenda json
  app.use(express.json());
  app.use(cors(corsOptions));

  // cria uma rota que retorna todos os posts presentes no banco de dados
  app.get("/posts", listarPosts);

  app.post("/posts", criarPosts);

  app.post("/upload",uploud.single("imagem") , uploudImagem );

  app.put("/upload/:id", updateNewPost );
  
};

export default routes;
