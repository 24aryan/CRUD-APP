const express = require('express');
const router = express.Router();
const connection = require('../config/db');


router.get('/add', (req, res) => {
    res.render('userform', { user: null });
});

router.get('/edit/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM user WHERE id = ?', [userId], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }
        if (rows.length > 0) {
            res.render('userform', { user: rows[0] });
        } else {
            res.status(404).send('User not found');
        }
    });
});

router.post('/create', (req, res) => {
    const { name, address, email, phone } = req.body;
    connection.query('INSERT INTO user (name, address, email, phone) VALUES (?, ?, ?, ?)', 
        [name, address, email, phone], 
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Database error');
            }
            res.redirect('/users');
        }
    );
});

router.post('/update/:id', (req, res) => {
    const userId = req.params.id;
    const { name, address, email, phone } = req.body;
    connection.query('UPDATE user SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?', 
        [name, address, email, phone, userId], 
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Database error');
            }
            res.redirect('/users');
        }
    );
});

router.post('/delete/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('DELETE FROM user WHERE id = ?', [userId], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }
        res.redirect('/users');
    });
});

router.get('/', (req, res) => {
    connection.query('SELECT * FROM user', (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }
        res.render('userlist', { users: rows });
    });
});

module.exports = router;
