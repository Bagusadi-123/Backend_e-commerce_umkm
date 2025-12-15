import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    qty: {type: Number, default: 1}, //quantity, jumlah
}, {versionKey: false});

export default mongoose.model("cart", cartSchema);
