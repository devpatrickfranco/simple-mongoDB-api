import { FastifyPluginAsync } from 'fastify';
import sqlite3 from 'better-sqlite3';

// Inicializa o banco SQLite
export const db = new sqlite3('messages.db');

// Cria a tabela se ela não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const userRoutes: FastifyPluginAsync = async (app) => {
  // Rota POST para capturar user_id e mensagem
  app.post('/receive-message', async (request, reply) => {
    try {
      const { user_id, message } = request.body as { user_id: string; message: string };

      if (!user_id || !message) {
        return reply.status(400).send({ error: 'Parâmetros inválidos. Informe user_id e message.' });
      }

      // Insere a mensagem no banco de dados
      const insertStatement = db.prepare(`
        INSERT INTO messages (user_id, message) 
        VALUES (?, ?)
      `);
      insertStatement.run(user_id, message);

      console.log(`Mensagem salva no banco do usuário ${user_id}: ${message}`);

      return reply.status(200).send({ status: 'mensagem recebida e salva com sucesso' });
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return reply.status(500).send({ error: 'Erro interno no servidor' });
    }
  });
};

export default userRoutes;


