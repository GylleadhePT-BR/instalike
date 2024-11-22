import fs from "fs";
import {
  getTodosPosts,
  criarNovoPost,
  updatePost,
} from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/serviceGemini.js";

export async function listarPosts(req, res) {
  // chama a fun o que retorna todos os posts
  const posts = await getTodosPosts();
  // retorna os posts em formato json
  res.status(200).json(posts);
}

export async function criarPosts(req, res) {
  // pega os dados do corpo da requisição
  const novoPost = req.body;
  // insere o post no banco de dados
  try {
    const postCriado = await criarNovoPost(novoPost);
    //res.status(200).send("Post criado com sucesso");
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error("Erro ao criar post: ", erro.message);
    res.status(500).send("Erro ao criar post");
  }
}

export async function uploudImagem(req, res) {
  // pega os dados do corpo da requisição
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };
  // insere o post no banco de dados
  try {
    const postCriado = await criarNovoPost(novoPost);
    const imgId = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imgId);
    //res.status(200).send("Post criado com sucesso");
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error("Erro ao criar post: ", erro.message);
    res.status(500).send("Erro ao criar post");
  }
}

export async function updateNewPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const postAtualizado = {
      imgUrl: urlImagem,
      alt: req.body.alt,
      descricao:descricao,
    };

    const postCriado = await updatePost(id, postAtualizado);

    //res.status(200).send("Post criado com sucesso");
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error("Erro ao criar post: ", erro.message);
    res.status(500).send("Erro ao criar post");
  }
}
