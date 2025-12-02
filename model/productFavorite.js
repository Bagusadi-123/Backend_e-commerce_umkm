import mongoose from "mongoose";

const productFavoriteSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model('productFavorite', productFavoriteSchema)
