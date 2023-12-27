const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const connectDB = async () => {
  dotenv.config();

  const client = new MongoClient(process.env.MONGO_DB_URL);

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db('appChamCong');
    const teacherCollection = db.collection('teachers');
    const authCollection = db.collection('auth');

    return { client, teacherCollection, authCollection };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection failed');
  }
};

module.exports = connectDB;
