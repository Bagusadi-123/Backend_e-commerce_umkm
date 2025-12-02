import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'order'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    qty: {type: Number, required: true},
}, {versionKey: false});

export default mongoose.model('orderDetail', orderDetailSchema);
