import express from 'express';
import User from '../model/user.js';

const router = express.Router();

//ambil semua data user (untuk admin)
router.get('/', async(req, res) =>{
    const getUsers = await User.find();
    res.json(getUsers);
    });

router.post('/', async (req, res) =>{
    try{
       //mengambil data dari body permintaan(postman / website)
        const {nama, email, alamat} = req.body;

        //Buat objek data baru sesuai dengan Skema Mongoose
        const newUser = {
            nama,
            email,
            alamat
        };
        //menyimpan data baru ke mongodb
        const userRegister = await User.create(newUser);

        //mengirim respon ke klien
        res.status(201).json({
        message: "Pendaftaran pengguna berhasil", 
        data: userRegister
    });

}catch (error) {
    //menangani jika ada kesalahan (misalnya email duplikat karena unique: true)
    console.error(error);
    res.status(500).json ({
        message: "Gagal memproses data",
        error: error.message
    });
}
    
});

export default router;