import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
import bcrypt from 'bcrypt'
const users = []
router.post('/login', function (req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email or password is missing" })
    }

    const user = users.find((el) => el.email === email)
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Password is incorrect" })
    }
    const token = jwt.sign(
        { email },
        JWT_SECRET, {
        expiresIn: '1h'
    }
    )

    return res.status(200).json({
        message: "Logic success",
        data: {
            token,
            email
        }
    })
})
router.post('/register', function (req, res) {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or password is missing" })
    } else {
        const hashPassword = bcrypt.hashSync(password, 10)

        users.push({ email: email, password: hashPassword })
    }

    res.status(200).send('register success')
})

export default router
