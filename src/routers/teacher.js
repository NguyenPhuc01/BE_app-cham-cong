const express = require('express');const connectDB = require('../config/connectDB.js');
const { ObjectId } = require('mongodb');
const authMiddleware = require('../middlewares/authMiddleware.js');

const { client, teacherCollection } = connectDB;
const router = express.Router();
router.get('/', authMiddleware, async function (req, res) {
  try {
    await client.connect();
    console.log('connect to MongoDB successfully');

    const teacher = await teacherCollection.find().toArray();
    res.json(teacher);
    // res.send('oke')
  } catch (error) {
    res.json({
      success: false,
      error: error
    });
  }
});
router.get('/edit', function (req, res) {});
router.post('/create', authMiddleware, async function (req, res) {
  const teacherData = req.body;
  try {
    await client.connect();
    const result = await teacherCollection.insertOne(req.body);
    res.status(200).json({
      success: true,
      data: {
        teacherData
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
});
router.put('/', async function (req, res) {
  const dataUpdate = req.body;
  try {
    await client.connect();
    await teacherCollection.updateOne(
      { _id: ObjectId.createFromHexString(`${dataUpdate._id}`) },
      {
        $set: {
          name: dataUpdate.name,
          age: dataUpdate.age,
          qty: dataUpdate.qty
        }
      }
    );
    res.status(200).json({
      success: true,
      data: {
        dataUpdate
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
