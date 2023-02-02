import mongoose from 'mongoose';

const MONGODB_URL = process.env.DATABASE || 'mongodb://127.0.0.1:27017/library-server';

const initDatabase = async () => {
  await mongoose.connect(MONGODB_URL);
};

export default initDatabase;
