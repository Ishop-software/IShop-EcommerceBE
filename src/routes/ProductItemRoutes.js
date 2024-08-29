import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { productItem } from '../models/productItemModels.js';

const router = express.Router()

router.post('/api/product/createProduct', async (req, res) => {
    try {
        const { name, description, originalPrice, discount, imageUrl, likes } = req.body;
        const price = (originalPrice/100) * discount;
        const finalPrice = originalPrice - price;
        const productData = {
            productId: uuidv4(),
            name: name,
            originalPrice: originalPrice,
            discount: discount,
            finalPrice: finalPrice,
            description: description,
            imageUrl: imageUrl,
            likes: likes
        };
        const createProduct = await productItem.create(productData)
            .then(() => { return res.status(200).json({ success: true, message: "Product added successfully.." }) })
            .catch((error) => { return res.status(404).json({ success: false, message: error.message }) })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/api/product/getAllProduct', async (req, res) => {
    try {
        const getAllProducts = await productItem.find({},{_id:0, __v:0, updatedAt:0, createdAt:0});
        if(getAllProducts.length > 0) {
            return res.status(200).json({ success: true, data: getAllProducts })
        } else {
            return res.status(404).json({ success: false, message: error.message })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

export default router;