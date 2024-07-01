import express from 'express';
import connectDB from './database/connection';
import routes from './routes/routes';

const app = express();

connectDB();
app.use(express.json());

app.use(routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
