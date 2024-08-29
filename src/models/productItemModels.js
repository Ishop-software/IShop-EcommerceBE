import mongoose from "mongoose";

var Schema = mongoose.Schema;

export const productItem = mongoose.model( "ProductItem", new Schema(
    {
        productId: String,
        originalPrice: Number,
        name: String,
        discount: Number,
        description: String,
        finalPrice: Number,
        imageUrl: String,
        likes: Number
    },
    {
        timestamps: true
    }
), "ProductItem");