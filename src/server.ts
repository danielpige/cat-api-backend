import app from './app';

import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.clear();
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
});