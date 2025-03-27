import { Request, RequestHandler, Response } from 'express';
import { Phone } from '../models/Phone';

export const phoneController = {
  // Obtener teléfonos con filtros y paginación
  getPhones: <RequestHandler>(async (req: Request, res: Response) => {
    try {
      const { search, page = 1, limit = 20 } = req.query;
      const query = search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { brand: { $regex: search, $options: 'i' } }
            ]
          }
        : {};

      const phones = await Phone.find(query)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
      
      const total = await Phone.countDocuments(query);

      res.json({
        phones,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit))
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener teléfonos' });
    }
  }),

  // Obtener teléfono por ID
  getPhoneById: <RequestHandler>(async (req, res) => {
    try {
      const phone = await Phone.findById(req.params.id);
      if (!phone) {
        return res.status(404).json({ message: 'Teléfono no encontrado' });
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el teléfono' });
    }
  }),

  // Crear teléfono
  createPhone: <RequestHandler>(async (req: Request, res: Response) => {
    try {
      const phone = new Phone(req.body);
      await phone.save();
      res.status(201).json(phone);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el teléfono' });
    }
  }),

  // Actualizar teléfono
  updatePhone: <RequestHandler>(async (req: Request, res: Response) => {
    try {
      const phone = await Phone.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!phone) {
        return res.status(404).json({ message: 'Teléfono no encontrado' });
      }
      res.json(phone);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el teléfono' });
    }
  }),

  // Eliminar teléfono
  deletePhone: <RequestHandler>(async (req, res) => {
    try {
      const phone = await Phone.findByIdAndDelete(req.params.id);
      if (!phone) {
        return res.status(404).json({ message: 'Teléfono no encontrado' });
      }
      res.json({ message: 'Teléfono eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el teléfono' });
    }
  })
};