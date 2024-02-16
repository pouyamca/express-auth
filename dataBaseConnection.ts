import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://0.0.0.0:27017/shops`, {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB