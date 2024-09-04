import { Router } from 'express';
import RoverController from '../Controllers/RoverController.js';
import { body, param } from 'express-validator';

const router = Router();

/**
 * Post and Put Rovers
 */ 

router.post('/rovers',
    [
        body('name').isString().notEmpty(),
        body('color').isString().notEmpty(),
    ],
    
    RoverController.createRover);

router.put('/rovers/:id',  
    [
            param('id').isInt(),
            body('name').isString().optional(),
            body('color').isString().optional(),
    ],
    
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
