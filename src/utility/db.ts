import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => {
    try {
        console.log('mongo_uri=>>', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connection to MongoDB successful');
    } catch (err: any) {
        console.error('Error occurred while connecting to database', err);
    }
};
