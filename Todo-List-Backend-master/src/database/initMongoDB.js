const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const dbName = process.env.MONGO_DB_NAME
const MONGO_URI = process.env.MONGO_URI + dbName || 'mongodb://127.0.0.1:27017/myDatabase';

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();