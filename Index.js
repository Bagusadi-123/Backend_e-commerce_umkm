import 'dotenv/config';
import mongoose from 'mongoose';
import express, {response} from 'express';
import cartRoutes from './router/cart.js';
import expeditionRoutes from './router/expedition.js';
import orderRoutes from './router/order.js';
import orderDetailRoutes from './router/orderDetail.js';
import productRoutes from './router/product.js';
import productFavorite from './router/productFavorite.js';
import productReviewRoutes from './router/productReview.js';
import storeDetailRoutes from './router/storeDetail.js';
import userRoutes from './router/user.js';
import userDetailRoutes from './router/userDetail.js';

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

//middleware untuk parsing atau mmegelola json 
app.use(express.json());

mongoose.connect(`${uri}/${dbName}`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//ketik semua api endpoint disini
app.use('/api/cart', cartRoutes);
app.use('/api/expedition', expeditionRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderDetail', orderDetailRoutes);
app.use('/api/product', productRoutes);
app.use('/api/productFavorite', productFavorite)
app.use('/api/productReview', productReviewRoutes);
app.use('/api/storeDetail', storeDetailRoutes);
app.use('/api/user', userRoutes);
app.use('/api/userDetail', userDetailRoutes);

// testing api endpoint, bisa dicek di browser (atau aplikasi postman)
// dan ketik localhost:4000/api/status
app.get('/api/status', async (req, res)=> {
    res.send({
        "status": "koneksi berhasil",
    });
});
//inisial REST API server
app.listen(port, () => {
    console.log("Server listening on Port:", port);
});
