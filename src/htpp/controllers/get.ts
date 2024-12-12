import { FastifyRequest, FastifyReply } from "fastify";
import { listMessages } from '../../db/database'; // Importando a função para listar mensagens


export async function listAppoitments(request: FastifyRequest, reply: FastifyReply) {
    try {
        const messages = await listMessages(); // Chama a função do banco para listar as mensagens
        return reply.status(200).send(messages); // Retorna as mensagens
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        return reply.status(500).send({ error: 'Erro interno no servidor' });
      }  
}
  

