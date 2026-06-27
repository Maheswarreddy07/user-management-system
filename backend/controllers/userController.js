const db = require('../config/db');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{10}$/;

exports.getAllUsers = async (req, res) => {
    try {
        const { search } = req.query;
        let query = 'SELECT * FROM users';
        let params = [];

        if (search) {
            query += ' WHERE full_name LIKE ? OR email LIKE ?';
            params = [`%${search}%`, `%${search}%`];
        }

        query += ' ORDER BY id DESC';
        const [rows] = await db.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { full_name, email, mobile_number, gender, city } = req.body;

    if (!full_name || !email || !mobile_number || !gender || !city) {
        return res.status(400).json({ message: 'All fields are mandatory.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!mobileRegex.test(mobile_number)) {
        return res.status(400).json({ message: 'Mobile number must be exactly 10 digits.' });
    }
    try {
        const [existing] = await db.query('SELECT id from users WHERE email=?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email address already exists.' });
        }
        const [result] = await db.query(
            'INSERT INTO users (full_name,email,mobile_number,gender,city) VALUES (?,?,?,?,?)',
            [full_name, email, mobile_number, gender, city]
        );
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { full_name, email, mobile_number, gender, city } = req.body;

    if (!full_name || !email || !mobile_number || !gender || !city) {
        return res.status(400).json({ message: 'All fields are mandatory.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!mobileRegex.test(mobile_number)) {
        return res.status(400).json({ message: 'Mobile number must be exactly 10 digits.' });
    }
    try {
        const [user] = await db.query('SELECT * from users WHERE id=?', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [emailCheck] = await db.query('SELECT id FROM users WHERE email=? AND id!=?', [email, id]);
        if (emailCheck.length > 0) {
            return res.status(400).json({ message: 'Email address already taken by another user.' });
        }
        await db.query(
            'UPDATE users SET full_name=?,email=?,mobile_number=?,gender=?,city=? WHERE id=?',
            [full_name, email, mobile_number, gender, city, id]
        );
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM users WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
