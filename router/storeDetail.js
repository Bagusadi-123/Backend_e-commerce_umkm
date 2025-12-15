import express from 'express';
import StoreDetail from '../model/storeDetail.js';
import {processImage, uploadHandler} from "../util/imageUtil.js";

const router = express.Router();

// ambil semua data storeDetail (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const storeDetails = await StoreDetail.find();
    res.status(200).send(storeDetails);
});

router.get('/:id', async (req, res) => {
    const storeDetails = await StoreDetail.findById(req.params.id);
    res.status(200).send(storeDetails);
});

// buat storeDetail baru, register
router.post('/', uploadHandler, async (req, res) => {
    try {
        const {user_id, store_name, store_desc} = req.body;
        if (!req.file) {
            return res.status(400).json({error: "Photo is required"});
        }

        const finalName = req.file.filename.replace(/\.[^/.]+$/, ".jpg");
        const webPath = await processImage("profile", req.file.path, finalName);

        const storeDetailInsert = new StoreDetail({
            user: user_id,
            store: store_name,
            store_desc: store_desc,
            photo_path: webPath
        });
        const insert = await storeDetailInsert.save();
        res.status(200).send(insert);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Failed to save store detail"});
    }
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
    const storeDetails = await StoreDetail.findByIdAndDelete(req.params.id)
    res.status(200).send({
        'status': true,
        'data': storeDetails
    });
});

export default router;
