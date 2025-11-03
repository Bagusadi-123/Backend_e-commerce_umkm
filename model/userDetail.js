import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    name: {type: String, default: 'Pengguna Baru'},
    address: {type: String, default: ''},
    photo_path: {type: String, require: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model('userDetail', userDetailSchema);
