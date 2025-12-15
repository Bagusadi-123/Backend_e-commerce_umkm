import express from 'express';
import OrderDetail from '../model/orderDetail.js';

const router = express.Router();

// ambil semua data orderDetail (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const orderDetails = await OrderDetail.find();
    res.status(200).send(orderDetails);
});

// buat orderDetail baru, register
router.post('/', async (req, res) => {
    const {name, price, desc, product_photo_path} = req.body;
    console.log(req.body);
    const orderDetailInsert = new OrderDetail({
        name: name,
        price: price,
        desc: desc,
        product_photo_path: product_photo_path
    });
    const insert = await orderDetailInsert.save();
    console.log(insert);
    res.status(200).send(insert);
});

// update data orderDetail
router.put('/:id', async (req, res) => {
    const orderDetails = await OrderDetail.findByIdAndUpdate(req.params.id, req.body, {})
    res.status(200).send({
        'status': true,
        'data': orderDetails
    });
});

router.delete('/:id', async (req, res) => {
    const orderDetails = await OrderDetail.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': orderDetails
    });
});

export default router;

