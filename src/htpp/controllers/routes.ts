import { FastifyInstance } from "fastify";
import { createAppointmets } from "./post";
import { listAppoitments } from "./get";

export async function appoitmentsRoutes(app: FastifyInstance) {
    
    app.post('/create', createAppointmets)
    app.get('/list', listAppoitments)
}