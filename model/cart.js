import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    qty: {type: Number, require: true, default: 1}, //quantity, jumlah
    total: {type: Number, default: -1},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model("cart", cartSchema);
