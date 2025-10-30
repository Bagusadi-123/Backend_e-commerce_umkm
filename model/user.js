import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nama: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    alamat: {type: String, require: true},
});

export default mongoose.model("user", userSchema); 



