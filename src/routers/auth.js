import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
import bcrypt from 'bcryptjs';
import { authCollection } from '../config/connectDB.js';
const users = [];
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email or password is missing' });
    }

    const user = await authCollection.find({ email: email }).toArray();
    console.log('🚀 ~ file: auth.js:15 ~ user:', user);
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    if (!bcrypt.compareSync(password, user[0].password)) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: '365d'
    });

    return res.status(200).json({
      message: 'Logic success',
      data: {
        token,
        email
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null
    });
  }
});
router.post('/register', async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email or password is missing' });
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);

      // users.push({ email: email, password: hashPassword })
      const checkHasUser = await authCollection
        .find({ email: email })
        .toArray();
      if (checkHasUser.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      } else {
        const dataRegister = await authCollection.insertOne({
          email,
          password: hashPassword
        });
        res.status(200).json({
          message: 'register success',
          data: {
            ...req.body,
            password: hashPassword
          }
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null
    });
  }
});

export default router;
