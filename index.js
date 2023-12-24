const express = require('express');
const authRouter = require('./src/routers/auth.js');
const studentRouter = require('./src/routers/student.js');
const teacherRouter = require('./src/routers/teacher.js');

const dotenv = require('dotenv');
const { client } = require('./src/config/connectDB.js');
console.log('🚀 ~ file: index.js:7 ~ client:', client);
dotenv.config();
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
    app.get('/', function (req, res) {
      res.send('Hello World');
    });

    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log('Error connect to MongoDB ', error);
  }
}

main();
module.exports = app;
