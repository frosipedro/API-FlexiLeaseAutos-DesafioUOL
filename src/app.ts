import dotenv from 'dotenv';
import express from 'express';
import connectDB from './database/connection';
import routes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger_output.json';

const app = express();
dotenv.config();

connectDB();
app.use(express.json());

app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

const port = process.env.PORT;
if (!port) {
  console.error('Please define the PORT variable in the .env file');
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
