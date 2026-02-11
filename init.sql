
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
);

-- Insert test users
INSERT INTO users (username, password) VALUES ('testuser1', 'password1');
INSERT INTO users (username, password) VALUES ('testuser2', 'password2');

-- View all users
SELECT * FROM users;