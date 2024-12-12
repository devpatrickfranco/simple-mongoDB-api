import { FastifyPluginAsync } from 'fastify';
import { MongoClient, Db, Collection } from 'mongodb';

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('A variável de ambiente MONGO_URI não foi configurada!');
}
const dbName = 'testDB'; // Nome do banco de dados
const collectionName = 'messages'; // Nome da coleção

// Inicializa a conexão com o MongoDB
let db: Db;
let messagesCollection: Collection;

async function connectToDatabase() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(dbName);
  messagesCollection = db.collection(collectionName);
  console.log('Conectado ao MongoDB');
}

const userRoutes: FastifyPluginAsync = async (app) => {
  // Conecta ao banco antes de registrar as rotas
  await connectToDatabase();

  // Rota POST para capturar user_id e mensagem
  app.post('/receive-message', async (request, reply) => {
    try {
      const { user_id, message } = request.body as { user_id: string; message: string };

      if (!user_id || !message) {
        return reply.status(400).send({ error: 'Parâmetros inválidos. Informe user_id e message.' });
      }

      // Salva a mensagem no MongoDB
      const result = await messagesCollection.insertOne({ user_id, message, created_at: new Date() });
      console.log(`Mensagem salva no banco MongoDB: ${result.insertedId}`);

      return reply.status(200).send({ status: 'mensagem recebida e salva com sucesso' });
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return reply.status(500).send({ error: 'Erro interno no servidor' });
    }
  });

  // Rota GET para listar mensagens
  app.get('/messages', async (request, reply) => {
    try {
      const messages = await messagesCollection.find({}).sort({ created_at: -1 }).toArray();
      return reply.status(200).send(messages);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      return reply.status(500).send({ error: 'Erro interno no servidor' });
    }
  });
};

export default userRoutes;