import mongoose from "mongoose";

const connectToMongo = async () => {
    const db = await mongoose.connect(process.env.MONGO_URI)

    console.log("Connected to MongoDB successfully")
}

export default connectToMongo;