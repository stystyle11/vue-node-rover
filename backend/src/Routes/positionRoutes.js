import { Router } from 'express';
import PositionController from '../Controllers/PositionController.js';

const router = Router();

router.post('/rovers/:rover_id/positions', PositionController.createPosition);
router.get('/rovers/:rover_id/positions', PositionController.getPositionsByRoverId);
router.put('/positions/:id', PositionController.updatePosition);
router.delete('/positions/:id', PositionController.deletePosition);

export default router;
