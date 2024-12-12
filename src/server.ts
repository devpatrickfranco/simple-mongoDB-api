// server.ts

import { app } from './app';
import { env } from './env/index';
import { connectToDatabase } from './db/database';
import * as path from 'path';
import fastifyStatic from '@fastify/static';

async function startServer() {
  try {
    // Conectar ao banco de dados antes de iniciar o servidor
    await connectToDatabase();

    // Registrar o fastifyStatic (se necessário)
    app.register(fastifyStatic, {
      root: path.join(__dirname, '../public'),
      prefix: '/', // Todos os caminhos servirão index.html
    });

    // Registrar a rota de health check
    app.get('/health', () => {
      return { status: 'running' };
    });

    // Iniciar o servidor Fastify
    await app.listen({
      port: env.PORT,
      host: '0.0.0.0'
    });

    console.log(`HTTP Server running on port ${env.PORT}`);
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1); // Se houver erro na conexão com o banco ou no servidor, o processo é encerrado
  }
}

// Iniciar o servidor
startServer();
