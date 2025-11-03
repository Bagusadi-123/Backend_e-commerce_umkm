import express from 'express';
import StoreDetail from '../model/storeDetail.js';

const router = express.Router();

// ambil semua data storeDetail (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const storeDetails = await StoreDetail.find();
    res.status(200).send(storeDetails);
});

// buat storeDetail baru, register
router.post('/', async (req, res) => {
    const {user_id, store_name, store_desc, photo_path} = req.body;
    console.log(req.body);
    const storeDetailInsert = new StoreDetail({
        user_id: user_id,
        store_name: store_name,
        store_desc: store_desc,
        photo_path: photo_path
    });
    const insert = await storeDetailInsert.save();
    console.log(insert);
    res.status(200).send(insert);
});

// update data storeDetail
router.put('/:id', async (req, res) => {
    const storeDetails = await StoreDetail.findByIdAndUpdate(req.params.id, req.body, {})
    res.status(200).send({
        'status': true,
        'data': storeDetails
    });
});

router.delete('/:id', async (req, res) => {
    const storeDetails = await StoreDetail.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': storeDetails
    });
});

export default router;