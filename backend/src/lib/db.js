import mongoose from 'mongoose';

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected successfully'))
    } catch (error) {
        console.log('MongoDB connection error', error);
    }
}