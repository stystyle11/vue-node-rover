import { Router } from 'express';
import PositionController from '../Controllers/PositionController.js';
import { body, param } from 'express-validator';

const router = Router();

/**
 * Post Put Position
*/
 
router.post('/rovers/:rover_id/positions',

    [
        param('rover_id').isInt(),
        body('coordinate_x').isInt(),
        body('coordinate_y').isInt(),
        body('position_facing').isString().notEmpty(),
    ],
        
    PositionController.createPosition);

router.put('/positions/:id',
    
    [
        param('rover_id').isInt(),
        body('coordinate_x').isInt().optional(),
        body('coordinate_y').isInt().optional(),
        body('position_facing').isString().optional(),
    ],
    
    PositionController.updatePosition);

/**
 * GET Positions
*/

router.get('/rovers/:rover_id/positions',
    
    [param('rover_id').isInt()],
        
    PositionController.getPositionsByRoverId);
/**
 * Delete Positions
*/ 

router.delete('/positions/:id',
    
    [param('id').isInt()],
    
    PositionController.deletePosition
);

export default router;
