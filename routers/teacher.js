import express from 'express'
import { MongoClient } from 'mongodb'

const router = express.Router();
router.get('/', async function (req, res) {
    const mongodbUrl = 'mongodb+srv://phucnguyendx9012:Phuc2001@cluster0.ex67or6.mongodb.net/'
    const client = new MongoClient(mongodbUrl)

    try {
        await client.connect()
        console.log('connect to MongoDB successfully');

        const teacherCollection = client.db('appChamCong').collection('teachers')
        const teacher = await teacherCollection.find().toArray()
        res.json(teacher)
    } catch (error) {

    }

})
router.get('/edit', function (req, res) {

})
router.get('/create', function (req, res) {

})
router.get('/update', function (req, res) {

})

export default router
