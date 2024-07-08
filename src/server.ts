import express from 'express';
import connectDB from './database/connection';
import routes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger_output.json';
import dotenv from 'dotenv';

const server = express();
dotenv.config();

connectDB();

server.use(express.json());
server.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(routes);

export default server;
