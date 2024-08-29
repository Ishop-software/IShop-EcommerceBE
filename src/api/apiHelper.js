import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from '../routes/userRoutes.js'

const db = mongoose.connect(process.env.MONGODB_URI)
.then(message => console.log("DB Connected successfully 👍.."))
.catch(error => console.log("DB not connected.."))

export const apiHelper = (app) => {
    app.use(userRoutes)
}