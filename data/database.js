import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "userdata",
    })
        .then((c) => console.log(`database connected with ${c.connection.host}`))
        .catch(() => { console.log("error in connetion") });
} 