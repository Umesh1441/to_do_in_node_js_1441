import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "userdata",
    })
        .then(() => console.log("database connected....."))
        .catch(() => { console.log("error in connetion") });
} 