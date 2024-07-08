import { Router } from 'express';
import { ReserveController } from '../../modules/reserves/reserve.controller';

const reserveRoutes = Router();
const reserveController = new ReserveController();

reserveRoutes.post('/', reserveController.createReserve);
reserveRoutes.get('/', reserveController.getReserves);
reserveRoutes.get('/:reserveId', reserveController.getReserveById);
reserveRoutes.put('/:reserveId', reserveController.updateReserve);
reserveRoutes.delete('/:reserveId', reserveController.deleteReserve);

export default reserveRoutes;
