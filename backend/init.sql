/* Can't get Docker to initialize the DB nor Prisma */
CREATE USER 'voyager2024'@'%' IDENTIFIED WITH caching_sha2_password BY 'voyager2024';
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS rovers;

USE rovers;

CREATE TABLE IF NOT EXISTS rovers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coordinate_x INT NOT NULL,
    coordinate_y INT NOT NULL,
    position_facing VARCHAR(255) NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rover_id INT,
    FOREIGN KEY (rover_id) REFERENCES rovers(id)
);
GRANT ALL PRIVILEGES ON rovers.* TO 'voyager2024'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'voyager2024'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'voyager2024'@'%' WITH GRANT OPTION;
