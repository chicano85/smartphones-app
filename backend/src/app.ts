import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/database';
import { phoneRoutes } from './routes/phoneRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a la base de datos
connectDB();

// Configuración de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

// Middleware
app.use(express.json());

// Rutas
app.use('/api/phones', phoneRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});