const connection = require('../config/db.js');

// GET ALL USERS
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM userdata', (err, rows) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// GET USER BY ID
exports.getUserById = (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM userdata WHERE id=?', [id], (err, rows) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(rows);
    });
};

// GET USER BY COURSE
exports.getUserByCourse = (req, res) => {
    const course = req.params.course;

    connection.query('SELECT * FROM userdata WHERE course=?', [course], (err, rows) => {
        if (err) {
            console.error("Error fetching by course:", err);
            return res.status(500).json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(rows);
    });
};

// CREATE USER
exports.createUser = (req, res) => {
    const { fname, lname, course, year } = req.body;

    // basic validation
    if (!fname || !lname) {
        return res.status(400).json({ message: "First and last name are required" });
    }

    connection.query(
        'INSERT INTO userdata (fname, lname, course, year) VALUES (?,?,?,?)',
        [fname, lname, course, year],
        (err, result) => {
            if (err) {
                console.error("Insert error:", err);
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'User Created Successfully',
                userId: result.insertId
            });
        }
    );
};

// UPDATE USER
exports.updateUser = (req, res) => {
    const { id, fname, lname, course, year } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    connection.query(
        'UPDATE userdata SET fname=?, lname=?, course=?, year=? WHERE id=?',
        [fname, lname, course, year, id],
        (err, result) => {
            if (err) {
                console.error("Update error:", err);
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User Updated Successfully' });
        }
    );
};

// DELETE USER
exports.deleteUser = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    connection.query(
        'DELETE FROM userdata WHERE id=?',
        [id],
        (err, result) => {
            if (err) {
                console.error("Delete error:", err);
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User Deleted Successfully' });
        }
    );
};
