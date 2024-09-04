import Rover from '../models/rover.js';

class RoverController {
  // Create a new rover
  static async createRover(req, res) {
    try {
      const { name, color } = req.body;
      const roverId = await Rover.create({ name, color });
      res.status(201).json({ id: roverId, message: 'Rover created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating rover', error });
    }
  }

  // Get all rovers
  static async getAllRovers(req, res) {
    try {
      const rovers = await Rover.findAll();
      res.status(200).json(rovers);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving rovers', error });
    }
  }

  // Get a single rover by ID
  static async getRoverById(req, res) {
    try {
      const { id } = req.params;
      const rover = await Rover.findById(id);
      if (!rover) {
        return res.status(404).json({ message: 'Rover not found' });
      }
      res.status(200).json(rover);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving rover', error });
    }
  }

  // Update a rover by ID
  static async updateRover(req, res) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;
      const updatedRover = await Rover.update(id, { name, color });
      if (!updatedRover) {
        return res.status(404).json({ message: 'Rover not found' });
      }
      res.status(200).json({ message: 'Rover updated successfully', updatedRover });
    } catch (error) {
      res.status(500).json({ message: 'Error updating rover', error });
    }
  }

  // Delete a rover by ID
  static async deleteRover(req, res) {
    try {
      const { id } = req.params;
      await Rover.delete(id);
      res.status(200).json({ message: 'Rover deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting rover', error });
    }
  }
}

export default RoverController;
