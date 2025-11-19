import express from 'express';
import Order from '../model/order.js';

const router = express.Router();

// ambil semua data order (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.status(200).send(orders);
});

// buat order baru, register
router.post('/', async (req, res) => {
    const {store_name, product_name, qty, price, total, order_status, waybill} = req.body;
    console.log(req.body);
    const orderInsert = new Order({
        store_name: store_name,
        product_name: product_name,
        qty: qty,
        price: price,
        total: total,
        order_status: order_status,
        waybill: waybill
    });
    const insert = await orderInsert.save();
    console.log(insert);
    res.status(200).send(insert);
});

// update data order
router.put('/:id', async (req, res) => {
    const orders = await Order.findByIdAndUpdate(req.params.id, req.body, {})
    res.status(200).send({
        'status': true,
        'data': orders
    });
});

router.delete('/:id', async (req, res) => {
    const orders = await Order.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': orders
    });
});

export default router;