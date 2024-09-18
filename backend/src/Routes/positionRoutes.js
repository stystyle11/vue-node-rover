import { Router } from 'express';
import { body, param } from 'express-validator';
import PositionController from '../controllers/PositionController.js';

import { validate } from '../middleware/validation.js';
const router = Router();

/**
 * Post Put Position
 */

router.post(
  '/rovers/:rover_id/positions',

  [
    param('rover_id').isInt(),
    body('coordinate_x').isInt(),
    body('coordinate_y').isInt(),
    body('position_facing').isString().notEmpty()
  ],
  validate,

  PositionController.createPosition
);
/**
 *  Put Position
 */

router.put(
  '/positions/:id',

  [
    param('rover_id').isInt(),
    body('coordinate_x').isInt().optional(),
    body('coordinate_y').isInt().optional(),
    body('position_facing').isString().optional()
  ],
  validate,

  PositionController.updatePosition
);

/**
 * GET Positions
 */

router.get(
  '/rovers/:rover_id/positions',

  [param('rover_id').isInt()],

  PositionController.getPositionsByRoverId
);
/**
 * Delete Positions
 */

router.delete(
  '/positions/:id',

  [param('id').isInt()],

  PositionController.deletePosition
);

export default router;
