import { FastifyRequest, FastifyReply } from 'fastify';
import { saveMessage } from '../../db/database'; // Importando as funções do banco de dados

export async function createAppointmets(request: FastifyRequest, reply: FastifyReply) {

  try {
      const { user_id, message } = request.body as { user_id: string; message: string };

      // Validação dos parâmetros
      if (!user_id || !message) {
        return reply.status(400).send({ error: 'Parâmetros inválidos. Informe user_id e message.' });
      }

      // Salva a mensagem no banco de dados
      await saveMessage(user_id, message); // Chama a função do banco

      return reply.status(200).send({ status: 'Mensagem recebida e salva com sucesso' });
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return reply.status(500).send({ error: 'Erro interno no servidor' });
    }
  }

