import express from 'express';
import { connectToDatabase } from './initializeDatabase.js';
const app = express();


const startServer = async () => {
  await connectToDatabase(); 
  
};

// Docker wait for it script is taking too long to debug
//for Testing purposes this workaround is faster.
setTimeout(startServer, 2500)
