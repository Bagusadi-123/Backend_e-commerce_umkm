import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema({
    username: {type: String, require: true},
    review_text: {type: String, require: true},
    rating: {type: Number, default: 5},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
}, {versionKey: false});

export default mongoose.model('productReview', productReviewSchema);
