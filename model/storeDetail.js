import mongoose from "mongoose";

const storeDetailSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    store_name: {type: String, require: true, unique: true},
    store_desc: {type: String, require: true},
    photo_path: {type: String, require: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model('storeDetail', storeDetailSchema);
