import mongoose from 'mongoose';

const MONGODB_URL = process.env.DATABASE || 'mongodb://127.0.0.1:27017/library-db-server';

const initDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.log(`mongoose connect error: ${error}`);
  }
};

export default initDatabase;
