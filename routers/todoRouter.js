import express from 'express'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import loggerMiddleware from '../middlewares/loggerMiddleware.js';
import jwt from 'jsonwebtoken'
import authMiddleware from '../middlewares/authMiddleware.js';

const todoRouter = express.Router();
const todoPath = path.join("resources", "todoResource.json")
const fileData = fs.readFileSync(todoPath, 'utf8')
const dataJson = JSON.parse(fileData)
const JWT_SECRET = "MY_SECRET_KEY"

todoRouter.get('/', authMiddleware, (req, res) => {
    try {

        res.status(200).json({
            success: true,
            data: dataJson
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

})


todoRouter.get('/:todoId', (req, res) => {
    try {
        const id = req.params.todoId
        let result = dataJson.filter((el) => el.id === (id))
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

todoRouter.post('/', (req, res) => {
    try {
        const data = req.body
        const newData = {
            id: uuidv4(),
            title: data.title,
            isCompleted: data.isCompleted
        }

        let result = [...dataJson, newData]
        fs.writeFileSync(todoPath, JSON.stringify(result));
        console.log("🚀 ~ file: todoRouter.js:42 ~ todoRouter.post ~ result:", result)
        res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

})

todoRouter.put('/:todoId', (req, res) => {
    try {

        const data = req.body
        const id = req.params.todoId
        let result = dataJson.map((el) => {
            if (el.id === id) {
                return { ...data, id: id }
            } else {
                return el
            }
        })
        fs.writeFileSync(todoPath, JSON.stringify(result))
        res.status(200).send('oke')
    } catch (error) {

    }

})

todoRouter.delete('/:todoId', (req, res) => {
    try {
        const id = req.params.todoId
        console.log("🚀 ~ file: todoRouter.js:69 ~ todoRouter.delete ~ id:", id)
        const result = dataJson.filter((el) => el.id !== id)
        fs.writeFileSync(todoPath, JSON.stringify(result))
        res.status(200).send('ok')
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

export default todoRouter