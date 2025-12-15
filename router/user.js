import express from 'express';
import User from '../model/user.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) { //jika email pass kosong, nanti dicek juga di aplikasi
        res.status(404).send({})
    }
    const result = await User.findOne({
        $and:
            [{email: email}, {password: password}]
    });
    if (!result) {
        res.status(404).send({'status': 'user not found'});
    } else {
        res.status(200).send(result);
    }
});


//ambil semua data user (untuk admin)
router.get('/', async (req, res) => {
    const getUsers = await User.find();
    res.json(getUsers);
});

router.post('/register', async (req, res) => {
    try {
        //mengambil data dari body permintaan(postman / website)
        const {username, email, password, role} = req.body;
        console.log(req.body);
        //Buat objek data baru sesuai dengan Skema Mongoose
        const userInsert = new User({
            username: username,
            email: email,
            password: password,
            role: role,
        });
        const insert = await userInsert.save();
        console.log(insert);
        res.status(200).send(insert);

    } catch (error) {
        //menangani jika ada kesalahan (misalnya email duplikat karena unique: true)
        console.error(error);
        res.status(500).json({
            message: "Gagal memproses data",
            error: error.message
        });
    }
});

// update data user
router.put('/:id', async (req, res) => {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {})
    res.status(200).send({
        'status': true,
        'data': users
    });
});

router.delete('/:id', async (req, res) => {
    const users = await User.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': users
    });
});


export default router;
