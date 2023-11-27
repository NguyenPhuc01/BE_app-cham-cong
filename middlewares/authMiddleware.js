const JWT_SECRET = process.env.JWT_SECRET
import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { email } = jwt.verify(token, JWT_SECRET)
        req.user = email
        next()
    } catch (error) {
        res.status(400).json({ message: 'unauthorized' })
    }
}

export default authMiddleware