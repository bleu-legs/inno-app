#!/bin/bash

echo "BleuLegs App v1.0"
echo "Starting Initial Setup..."

sleep 1

# Install dependencies
sudo apt install -y nodejs -y
sudo apt install -y npm -y
npm install
sudo apt install -y mysql-server -y

# Set up MySQL user, database, and privileges
sudo mysql -e "CREATE USER 'bleulegs'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bleulegs';"
sudo mysql -e "CREATE DATABASE bleulegs;"
sudo mysql -e "GRANT ALL PRIVILEGES ON bleulegs.* TO 'bleulegs'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Create the users table without role and username
sudo mysql -e "USE bleulegs; CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);"

# Create the sessions table with a foreign key to the users table
sudo mysql -e "USE bleulegs; CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);"

echo "Initial Setup Complete"
echo "Run the app with: npm run app"
echo ""
echo "Exiting..."