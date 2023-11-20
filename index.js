import express from "express";
import authRouter from './routers/auth.js'
import studentRouter from './routers/student.js'
import teacherRouter from './routers/teacher.js'
import todoRouter from './routers/todoRouter.js'

const app = express()
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use("/students", studentRouter)
app.use("/teachers", teacherRouter)
app.use("/api/v1/todos", todoRouter)
app.get('/', function (req, res) {
  res.send('Hello World')
})



app.listen(3000)