import express from 'express'
import { client, teacherCollection } from '../config/connectDB.js';
import { ObjectId } from 'mongodb';
const router = express.Router();
router.get('/', async function (req, res) {

    try {
        await client.connect()
        console.log('connect to MongoDB successfully');


        const teacher = await teacherCollection.find().toArray()
        res.json(teacher)
        // res.send('oke')
    } catch (error) {
        res.json({
            success: false,
            error: error
        })
    }

})
router.get('/edit', function (req, res) {

})
router.post('/create', async function (req, res) {
    const teacherData = req.body
    try {
        await client.connect()
        const result = await teacherCollection.insertOne(req.body)
        res.status(200).json({
            success: true,
            data: {
                teacherData,

            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
    }

})
router.put('/', async function (req, res) {
    const dataUpdate = req.body
    try {
        await client.connect()
        await teacherCollection.updateOne({ _id: ObjectId.createFromHexString(`${dataUpdate._id}`) }, {
            $set:
                { name: dataUpdate.name, age: dataUpdate.age, qty: dataUpdate.qty }
        })
        res.status(200).json({
            success: true,
            data: {
                dataUpdate
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, error })
    }
})

export default router
