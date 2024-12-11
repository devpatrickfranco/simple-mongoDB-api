import Fastify from 'fastify';
import * as path from 'path';
import fastifyStatic from '@fastify/static';

const fastify = Fastify();

// Configurar rota para servir arquivos estáticos (index.html)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/', // Todos os caminhos servirão index.html
});

// Testando rota principal para confirmar que o servidor funciona
fastify.get('/health', async (request, reply) => {
  return { status: 'running' };
});

// Iniciar servidor na porta 5000
const startServer = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log('Servidor Fastify rodando em http://localhost:5000');
  } catch (error) {
    console.error('Erro ao iniciar o servidor', error);
    process.exit(1);
  }
};

startServer();
