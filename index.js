const express = require('express');const authRouter = require('./src/routers/auth.js');
const studentRouter = require('./src/routers/student.js');
const teacherRouter = require('./src/routers/teacher.js');

const dotenv = require('dotenv');
const { client } = require('./src/config/connectDB.js');
dotenv.config();
const app = express();
async function main() {
  try {
    console.log('111');

    await client.connect();
    console.log('file: index.js:7 ~ connect to MongoDB successfully');

    // const teacherCollection = client.db('appChamCong').collection('teachers')
    console.log('22222');
    app.use(express.json());
    console.log('333');

    app.use('/api/v1/auth', authRouter);
    console.log('24444');

    app.use('/students', studentRouter);
    console.log(555555);
    app.use('/teachers', teacherRouter);
    app.get('/', function (req, res) {
      res.send('Hello World');
    });
    console.log(6666666);

    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log('Error connect to MongoDB ', error);
  }
}

main().catch(error => {
  console.error('Unexpected error occurred:', error);
});
module.exports = app;
