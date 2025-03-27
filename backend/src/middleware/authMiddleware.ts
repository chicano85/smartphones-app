import { NextFunction, Request, Response } from 'express';

const API_KEY = process.env.API_KEY || '87909682e6cd74208f41a6ef39fe4191';

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'API key inválida o no proporcionada' });
  }
  
  next();
}; 