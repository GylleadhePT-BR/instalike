import 'dotenv/config';
// importa a fun o que conecta ao banco de dados
import { ObjectId } from "mongodb";
import { conectarAoBancoDeDados } from "../config/databaseconfig";

// conecta ao banco de dados
const conexao = await conectarAoBancoDeDados(process.env.STRING_CONEXAO);


// A função `getTodosPosts` é uma função assíncrona que se conecta ao banco de dados
// e retorna todos os documentos presentes na coleção "posts" do banco "imsersao-instabytes".
// Ela faz isso utilizando o método `find()` da coleção, que retorna um cursor,
// e então converte esse cursor em um array com `toArray()`.

// Uma função assíncrona em JavaScript é uma função que permite a execução de operações
// assíncronas utilizando a palavra-chave `async`. Dentro de uma função assíncrona, podemos
// usar a palavra-chave `await` para pausar a execução da função até que uma Promise seja resolvida
// ou rejeitada. Isso facilita o gerenciamento de operações assíncronas, como chamadas a APIs
// ou operações de entrada/saída, permitindo que o código seja escrito de maneira mais
// linear e fácil de ler.
export async function getTodosPosts() {
    // seleciona o banco de dados
    const db = conexao.db("imsersao-instabytes");
    // seleciona a cole o de posts
    const colecao = db.collection("posts");
    // retorna todos os posts presentes na cole o
    return colecao.find().toArray();
  }
  
export async function criarNovoPost(post) {
    // seleciona o banco de dados
    const db = conexao.db("imsersao-instabytes");
    // seleciona a cole o de posts
    const colecao = db.collection("posts");
    // insere o post no banco de dados
    return colecao.insertOne(post);
  }

export async function updatePost( id , post){
  // seleciona o banco de dados
  const db = conexao.db("imsersao-instabytes");
  // seleciona a cole o de posts
  const colecao = db.collection("posts");
  // insere o post no banco de dados
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: post });
}