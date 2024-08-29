import mongoose from "mongoose";

var Schema = mongoose.Schema;

export const User = mongoose.model("User", new Schema(
    {
        userId: String,
        userName: String,
        email: String,
        password: String
    },
    { 
        timestamps: true
    }
), "User" );