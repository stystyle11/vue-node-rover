import mysql from 'mysql2/promise';

export const connectToDatabase = async () => {
  // DOCKER has a bug to accept process.env.DB_USER ...
  try {
    const connection = await mysql.createPool({
      host: 'mysqldb',
      port: 3306,
      user: 'voyager2024',
      password: 'voyager2024',
      database: 'voyager_rovers'
    });
    console.log('Connected to the database');

    const roversTable = `
        CREATE TABLE IF NOT EXISTS rovers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          color VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

    const positionsTable = `
        CREATE TABLE IF NOT EXISTS positions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          coordinate_x INT NOT NULL,
          coordinate_y INT NOT NULL,
          position_facing VARCHAR(255) NOT NULL, 
          logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                 
        );
      `;
    await connection.execute(roversTable);

    console.log('Rovers table created or already exists.');
    await connection.execute(positionsTable);

    console.log('Positions table created or already exists.');
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
};
