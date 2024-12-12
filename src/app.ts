import Fastify from 'fastify';
import { appoitmentsRoutes } from './htpp/controllers/routes'

export const app = Fastify();

app.register(appoitmentsRoutes)

