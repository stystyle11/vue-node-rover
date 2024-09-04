import { Router } from 'express';
import RoverController from '../Controllers/RoverController.js';

const router = Router();

router.post('/rovers', RoverController.createRover);
router.get('/rovers', RoverController.getAllRovers);
router.get('/rovers/:id', RoverController.getRoverById);
router.put('/rovers/:id', RoverController.updateRover);
router.delete('/rovers/:id', RoverController.deleteRover);

export default router;
