import mongoose from "mongoose";
import orderStatus from "./constant.js";

const orderSchema = new mongoose.Schema({
    store_name: {type: String, require: true},
    product_name: {type: String, require: true},
    qty: {type: Number, require: true},
    price: {type: Number, require: true},
    total: {type: String, require: true},
    order_status: {type: String, default: orderStatus.BELUM_BAYAR},
    waybill: {type: String, require: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model('order', orderSchema);
