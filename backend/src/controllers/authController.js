const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Load JWT secret from env (fallback for local dev)
const JWT_SECRET = process.env.JWT_SECRET || 'your_local_jwt_secret';
const JWT_EXPIRES_IN = '7d'; // token validity

/**
 * Register a new user.
 * Expected body: { email, password, name (optional) }
 */
async function signup(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    try {
        // Check if user already exists
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rowCount > 0) {
            return res.status(409).json({ success: false, message: 'User already exists.' });
        }
        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Insert user
        const result = await pool.query(
            `INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at`,
            [email, hashedPassword, name || null]
        );
        const user = result.rows[0];
        // Create JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return res.status(201).json({ success: true, token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ success: false, message: 'Server error during signup.', error: err.message });
    }
}

/**
 * Login existing user.
 * Expected body: { email, password }
 */
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    try {
        const result = await pool.query('SELECT id, email, password, name FROM users WHERE email = $1', [email]);
        if (result.rowCount === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error during login.', error: err.message });
    }
}

module.exports = { signup, login };

