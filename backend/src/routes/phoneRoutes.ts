import { Router } from 'express';
import { phoneController } from '../controllers/phoneController';
import { validateApiKey } from '../middleware/authMiddleware';

const router = Router();

// Rutas públicas
router.get('/', phoneController.getPhones);
router.get('/:id', phoneController.getPhoneById);

// Rutas protegidas
router.use(validateApiKey);
router.post('/', phoneController.createPhone);
router.put('/:id', phoneController.updatePhone);
router.delete('/:id', phoneController.deletePhone);

export const phoneRoutes = router;