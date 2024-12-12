// db/database.ts

import { MongoClient, Db, Collection } from 'mongodb';
import { env } from '../env/index';

const mongoUri = env.MONGO_URI;

if (!mongoUri) {
  throw new Error('A variável de ambiente MONGO_URI não foi configurada!');
}

const dbName = 'testDB'; // Nome do banco de dados
const collectionName = 'messages'; // Nome da coleção

let db: Db;
let messagesCollection: Collection;

// Função para conectar ao banco de dados
export async function connectToDatabase() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    db = client.db(dbName);
    messagesCollection = db.collection(collectionName);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw new Error('Erro ao conectar ao MongoDB');
  }
}

// Função para salvar a mensagem no MongoDB
export async function saveMessage(user_id: string, message: string) {
  try {
    const result = await messagesCollection.insertOne({
      user_id,
      message,
      created_at: new Date(),
    });
    console.log(`Mensagem salva no banco MongoDB: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error('Erro ao salvar mensagem no MongoDB:', error);
    throw new Error('Erro ao salvar mensagem no banco de dados');
  }
}

// Função para listar todas as mensagens do MongoDB
export async function listMessages() {
  try {
    const messages = await messagesCollection
      .find({})
      .sort({ created_at: -1 }) // Ordenar pelas mensagens mais recentes
      .toArray();
    return messages;
  } catch (error) {
    console.error('Erro ao buscar mensagens no MongoDB:', error);
    throw new Error('Erro ao buscar mensagens no banco de dados');
  }
}
