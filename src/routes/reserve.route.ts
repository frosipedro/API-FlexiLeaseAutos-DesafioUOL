import { Router } from 'express';
import { ReserveController } from '../api/controllers/reserve.controller';

const reserveRoutes = Router();
const reserveController = new ReserveController();

reserveRoutes.post('/reserve', reserveController.createReserve);
reserveRoutes.get('/reserve', reserveController.getReserves);
reserveRoutes.get('/reserve/:reserveId', reserveController.getReserveById);
reserveRoutes.put('/reserve/:reserveId', reserveController.updateReserve);
reserveRoutes.delete('/reserve/:reserveId', reserveController.deleteReserve);

export default reserveRoutes;
