
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const register = (req, res) => {
  const { first_name, last_name, email, password, date_of_birth, address } = req.body;

  const q = 'SELECT * FROM users WHERE email = ?';
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json('User already exists!');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q2 = 'INSERT INTO users(`first_name`, `last_name`, `email`, `password`, `date_of_birth`, `address`) VALUES (?)';
    const values = [first_name, last_name, email, hash, date_of_birth, address];

    db.query(q2, [values], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('User registered successfully');
    });
  });
};

export const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE email = ?';
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    const user = data[0];
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(400).json('Wrong email or password!');

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password, ...others } = user;
    res.json({ token, user: others });
  });
};

export const getUser = (req, res) => {
  const q = 'SELECT id, first_name, last_name, email, date_of_birth, address FROM users WHERE id = ?';
  db.query(q, [req.user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};
