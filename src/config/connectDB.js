import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
config()
export const client = new MongoClient(process.env.MONGO_DB_URL)
export const teacherCollection = client.db('appChamCong').collection('teachers')

export const authCollection = client.db('appChamCong').collection('auth')