import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    store: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    name: {type: String, require: true},
    price: {type: Number, require: true},
    desc: {type: String, require: true},
    product_photo_path: {type: String, require: true},
    stock: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

productSchema.plugin(mongoosePaginate);

export default mongoose.model('product', productSchema);
