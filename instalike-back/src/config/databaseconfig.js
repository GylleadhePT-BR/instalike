import {MongoClient} from 'mongodb';

export async function conectarAoBancoDeDados(stringConexao) {
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao cluster do banco de dados...");
        await mongoClient.connect();
        console.log("Banco de dados conectado com sucesso !!!");
        return mongoClient;
    }catch(erro){
        console.log("Erro ao conectar ao banco de dados: ", erro);
        process.exit();
    }
}