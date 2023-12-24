const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
console.log('process.env.MONGO_DB_URL', process.env.MONGO_DB_URL);
const client = new MongoClient(process.env.MONGO_DB_URL);
const teacherCollection = client.db('appChamCong').collection('teachers');
const authCollection = client.db('appChamCong').collection('auth');

module.exports = { client, teacherCollection, authCollection };
