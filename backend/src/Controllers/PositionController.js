import Position from '../models/Position.js';

class PositionController {
  // Create a new position for a specific rover
  static async createPosition(req, res) {
    try {
      const { coordinate_x, coordinate_y, position_facing } = req.body;
      const { rover_id } = req.params;
      const positionId = await Position.create({
        coordinate_x,
        coordinate_y,
        position_facing,
        rover_id
      });
      res.status(201).json({ id: positionId, message: 'Position created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating position', error });
    }
  }

  // Get all positions for a specific rover
  static async getPositionsByRoverId(req, res) {
    try {
      const { rover_id } = req.params;
      const positions = await Position.findAllByRoverId(rover_id);
      res.status(200).json(positions);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving positions', error });
    }
  }

  // Update a position by ID
  static async updatePosition(req, res) {
    try {
      const { id } = req.params;
      const { coordinate_x, coordinate_y, position_facing } = req.body;
      const updatedPosition = await Position.update(id, {
        coordinate_x,
        coordinate_y,
        position_facing
      });
      res.status(200).json({ message: 'Position updated successfully', updatedPosition });
    } catch (error) {
      res.status(500).json({ message: 'Error updating position', error });
    }
  }

  // Delete a position by ID
  static async deletePosition(req, res) {
    try {
      const { id } = req.params;
      await Position.delete(id);
      res.status(200).json({ message: 'Position deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting position', error });
    }
  }
}

export default PositionController;
