import mongoose, { ConnectOptions } from "mongoose";

const options = {
    autoIndex: process.env.NODE_ENV === 'development',
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions;

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI, options);
    } catch (err) {
        console.error(err);
    }
}

