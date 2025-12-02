import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import userRoutes from './router/user.js';
import UserDetailRoutes from './router/userDetail.js';
import CartRoutes from './router/cart.js';
import ExpeditionRoutes from './router/expedition.js';
import OrderRoutes from './router/order.js';
import OrderDetailRoutes from './router/orderDetail.js';
import ProductRoutes from './router/product.js';
import ProductFavorite from "./model/productFavorite.js";
import ProductReviewRoutes from './router/productReview.js';
import StoreDetailRoutes from './router/storeDetail.js';
import path from "path";

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

//middleware untuk parsing atau mmegelola json 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(`${uri}/${dbName}`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//ketik semua api endpoint disini
app.use('/api/user', userRoutes);
// app.use('/api/user', UserDetailRoutes);
app.use('/api/product/cart', CartRoutes);
app.use('/api/expedition', ExpeditionRoutes);
app.use('/api/order', OrderRoutes);
// app.use('/api/order-detail', OrderDetailRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/product/favorite', ProductFavorite);
app.use('/api/review', ProductReviewRoutes);
app.use('/api/store', StoreDetailRoutes);

//untuk lokasi foto, dan file lain mungkin
app.use('/storage', express.static(path.resolve(process.cwd(), 'storage')));

// testing api endpoint, bisa dicek di browser (atau aplikasi postman)
// dan ketik localhost:4000/api/status
app.get('/api/status', async (req, res) => {
    res.send({
        "status": "koneksi berhasil",
    });
});

//response jika method tidak tersedia/tidak bisa diakses
//(misal di postman pakai POST ke url yang harusnya cuma GET
//harus diletakkan di baris bawah sendiri, setelah semua route didefinisikan
app.use((req, res) => {
    res.status(404).json({error: "Not Found"});
});

//inisial REST API server
app.listen(port, () => {
    console.log("Server listening on Port:", port);
});
