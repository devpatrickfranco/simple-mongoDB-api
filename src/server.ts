import Fastify from 'fastify';
import * as path from 'path';
import fastifyStatic from '@fastify/static';
import userRoutes from './htpp/controllers/post';
import process from 'process'; 
import { env } from './env';

export const app = Fastify();

// Configurar rota para servir arquivos estáticos (index.html)
app.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/', // Todos os caminhos servirão index.html
});

app.register(userRoutes)

// Testando rota principal para confirmar que o servidor funciona
app.get('/health', async (request, reply) => {
  return { status: 'running' };
});

// Iniciar servidor na porta 5000
const startServer = async () => {
  try {
    // Usando process.env.PORT para pegar a porta definida pelo Render
    const port = env.PORT || 5000;
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`HTTP Server running in ${port}`);
  } catch (error) {
    console.error('Erro ao iniciar o servidor', error);
    process.exit(1);
  }
};

startServer();
