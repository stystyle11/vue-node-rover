import { Router } from 'express';
import RoverController from '../controllers/RoverController.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation.js';
const router = Router();

/**
 * Post and Put Rovers
 */ 

router.post('/rovers',
    
    [
        body('name').isString().notEmpty(),
        body('color').isString().notEmpty(),
    ],
    validate,
    
    RoverController.createRover);

router.put('/rovers/:id',  

    [
        param('id').isInt(),
        body('name').isString().optional(),
        body('color').isString().optional(),
    ],
    validate,
    
    RoverController.updateRover);   

/**
 * GET Rovers
 */ 

router.get('/rovers', RoverController.getAllRovers);

router.get('/rovers/:id',

    [param('id').isInt()],
    
    RoverController.getRoverById);

/**
 * Delete Rovers
 */ 

router.delete('/rovers/:id', 

    [param('id').isInt()],
    
    RoverController.deleteRover);


export default router;
