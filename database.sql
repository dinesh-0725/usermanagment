-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS usermanagement;

-- Use the newly created database
USE usermanagement;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    login_time VARCHAR(255),
    role VARCHAR(255),
    phone VARCHAR(50)
);

-- Insert the starter data (the names you requested)
INSERT INTO users (email, name, company, active, login_time, role, phone) VALUES 
('omkar@gmail.com', 'Omkar', 'Infosys', true, '10-05-2026', 'Admin', '9999999991'),
('harish@yahoo.com', 'Harish', 'TCS', true, '11-05-2026', 'Dev', '9999999992'),
('mounika@hotmail.com', 'Mounika', 'Wipro', false, '12-05-2026', 'Tester', '9999999993'),
('sravani@gmail.com', 'Sravani', 'Cognizant', true, '13-05-2026', 'HR', '9999999994'),
('dinesh@gmail.com', 'Dinesh', 'Google', true, '14-05-2026', 'Manager', '9999999995');
