import express from 'express';
import cors from 'cors';
////import { connectToDatabase } from './initializeDatabase.js';
import roverRoutes from './src/routes/RoverRoutes.js';
import positionRoutes from './src/routes/PositionRoutes.js';

const app = express();
app.use(cors());
app.options('*', cors()); // allow cors for pre flight
const startServer = async () => {
  //await connectToDatabase();
};

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api', roverRoutes);
app.use('/api', positionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Docker wait for it script is taking too long to debug
//for Testing purposes this workaround is faster.
//setTimeout(startServer, 15500);
