import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydatabase',
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,         // Allow up to 10 concurrent connections
  waitForConnections: true,    // Queue connection requests if all connections are in use
  queueLimit: 0,               // No limit on the connection request queue
  acquireTimeout: 10000,       // Wait up to 10 seconds for a connection
  connectTimeout: 10000,       // Timeout for establishing a new connection
  charset: 'utf8mb4_general_ci', // Set character set for connection
  timezone: 'Z',               // Use UTC timezone
  multipleStatements: false,   // Disallow multiple statements per query for security
});

export default pool;
