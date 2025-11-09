import mongoose from "mongoose";

const productFavoriteSchema = new mongoose.Schema({
    product: {type: String, require: true},
    price: {type: Number, require: true},
    product_photo_path: {type: String, require: true},
    deleted: {type: Boolean, default: false},
},{versionKey: false});

export default mongoose.model('productFavorite', productFavoriteSchema)
