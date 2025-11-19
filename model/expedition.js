import mongoose from "mongoose";

const expeditionSchema = new mongoose.Schema({
    name: {type: String, require: true},
    //TODO mungkin ada tambahan lain
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model('expedition', expeditionSchema);
