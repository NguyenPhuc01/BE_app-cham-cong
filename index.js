import express from "express";
import authRouter from './routers/auth.js'
import studentRouter from './routers/student.js'
import teacherRouter from './routers/teacher.js'
import todoRouter from './routers/todoRouter.js'
import { MongoClient } from 'mongodb'


async function main() {
  const app = express()
  const mongodbUrl = 'mongodb+srv://phucnguyendx9012:Phuc2001@cluster0.ex67or6.mongodb.net/'
  const client = new MongoClient(mongodbUrl)
  try {
    await client.connect()
    console.log('connect to MongoDB successfully');

    const teacherCollection = client.db('appChamCong').collection('teachers')
    const teacher = await teacherCollection.find().toArray()
    console.log("🚀 ~ file: index.js:19 ~ main ~ teacher:", teacher)
  } catch (error) {
    console.log('Error connect to MongoDB ', error);

  }



  app.use(express.json())
  app.use('/api/v1/auth', authRouter)
  app.use("/students", studentRouter)
  app.use("/teachers", teacherRouter)
  app.use("/api/v1/todos", todoRouter)
  app.get('/', function (req, res) {
    res.send('Hello World')
  })



  app.listen(3000)
}

main()