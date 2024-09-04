import express from 'express';
import { connectToDatabase } from './initializeDatabase.js';
import roverRoutes from './src/Routes/roverRoutes.js';
import positionRoutes from './src/Routes/positionRoutes.js';



const app = express();


const startServer = async () => {
  await connectToDatabase(); 
  
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
setTimeout(startServer, 2500)
