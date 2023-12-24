import express from 'express';
import authRouter from '../learnNodejs/src/routers/auth.js';
import studentRouter from '../learnNodejs/src/routers/student.js';
import teacherRouter from '../learnNodejs/src/routers/teacher.js';
// import todoRouter from '../learnNodejs/src/routers/todoRouter.js';

import { config } from 'dotenv';
import { client } from '../learnNodejs/src/config/connectDB.js';
config();
const app = express();
async function main() {
  try {
    await client.connect();
    console.log('connect to MongoDB successfully');

    // const teacherCollection = client.db('appChamCong').collection('teachers')

    app.use(express.json());
    app.use('/api/v1/auth', authRouter);
    app.use('/students', studentRouter);
    app.use('/teachers', teacherRouter);
    // app.use('/api/v1/todos', todoRouter);
    app.get('/', function (req, res) {
      res.send('Hello World');
    });

    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log('Error connect to MongoDB ', error);
  }
}

main();
