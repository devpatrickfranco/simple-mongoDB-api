import Fastify from 'fastify';
import * as path from 'path';
import fastifyStatic from '@fastify/static';
import userRoutes from './htpp/controllers/post';
import getMessages from './htpp/controllers/get';

export const app = Fastify();

// Configurar rota para servir arquivos estáticos (index.html)
app.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/', // Todos os caminhos servirão index.html
});

app.register(userRoutes, getMessages)

// Testando rota principal para confirmar que o servidor funciona
app.get('/health', async (request, reply) => {
  return { status: 'running' };
});

// Iniciar servidor na porta 5000
const startServer = async () => {
  try {
    await app.listen({ port: 5000 });
    console.log('Servidor Fastify rodando em http://localhost:5000');
  } catch (error) {
    console.error('Erro ao iniciar o servidor', error);
    process.exit(1);
  }
};

startServer();
