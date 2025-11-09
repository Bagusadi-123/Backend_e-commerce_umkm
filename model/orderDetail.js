import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    desc: {type: String, require: true},
    product_photo_path: {type: String, require: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model('orderDetail', orderDetailSchema);
