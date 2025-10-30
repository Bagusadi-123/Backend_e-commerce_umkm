import 'dotenv/config';
import mongoose from 'mongoose';
import express, {response} from 'express';
import userRoutes from './router/user.js';

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
app.use('/api/user', userRoutes);

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