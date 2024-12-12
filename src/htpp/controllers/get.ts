import { FastifyPluginAsync } from "fastify";
import { db } from './post' 

const getMessages: FastifyPluginAsync = async (app) => {
  
    app.get('/messages', async (request, reply) => {
      try {
        const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
        return reply.status(200).send(messages);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        return reply.status(500).send({ error: 'Erro interno no servidor' });
      }
    });  
}

export default getMessages

  
  