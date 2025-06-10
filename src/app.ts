import express from 'express';
import cors from 'cors';
import catsRoutes from './routes/cats.routes';
import imagesRoutes from './routes/images.routes';
import usersRoutes from './routes/users.routes';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cats', catsRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/users', usersRoutes);


export default app;