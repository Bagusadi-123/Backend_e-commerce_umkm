import express from 'express';
import UserDetail from '../model/userDetail.js';

const router = express.Router();

// ambil semua data user (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const userDetails = await UserDetail.find();
    res.status(200).send(userDetails);
});

// buat user baru, register
router.post('/', async (req, res) => {
    const {user_id, name, address, photo_path} = req.body;
    console.log(req.body);
    const userDetailInsert = new UserDetail({
        user_id: user_id,
        name: name,
        address: address,
        photo_path: photo_path,
    });
    const insert = await userDetailInsert.save();
    console.log(insert);
    res.status(200).send(insert);
});

// update data user
router.put('/:id', async (req, res) => {
    const userDetails = await UserDetail.findByIdAndUpdate(req.params.id, req.body, {})
    res.status(200).send({
        'status': true,
        'data': userDetails
    });
});

router.delete('/:id', async (req, res) => {
    const userDetails = await UserDetail.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': userDetails
    });
});

export default router;