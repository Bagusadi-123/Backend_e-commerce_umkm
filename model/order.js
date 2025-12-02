import mongoose from "mongoose";
import orderStatus from "./constant.js";

const orderSchema = new mongoose.Schema({
    store: {type: mongoose.Schema.Types.ObjectId, ref: 'store'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    qty: {type: Number, require: true},
    price: {type: Number, require: true},
    total: {type: String, require: true},
    order_status: {type: String, default: orderStatus.BELUM_BAYAR},
    waybill: {type: String, require: true},
    payment_method: {type: String, required: true},
    order_detail: [{type:mongoose.Schema.Types.ObjectId, ref: 'orderDetail'}],
}, {versionKey: false});

export default mongoose.model('order', orderSchema);
