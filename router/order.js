import express from 'express';
import Order from '../model/order.js';
import OrderDetail from '../model/orderDetail.js';
import orderStatus from "../model/constant.js";

const router = express.Router();

// ambil semua data order (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const orders = await Order.find().exec();
    res.status(200).send(orders);
});

//ambil data order per user
router.get('/user/:id', async (req, res) => {
    const orders = await Order.find({user: req.params.id}).populate({
        path: 'order_detail',
        populate: {
            path: 'product'
        }
    });
    res.status(200).send(orders);
});

//ambil data order per id
router.get('/id/:id', async (req, res) => {
    const orders = await Order.findById(req.params.id).populate({
        path: 'order_detail',
        populate: {
            path: 'product'
        }
    });
    res.status(200).send(orders);
});

// buat order baru
router.post('/new', async (req, res) => {
    const {store_id, user_id, qty, price, total, payment_method, expedition_courier} = req.body;
    console.log(req.body);
    const orderInsert = new Order({
        store: store_id,
        user: user_id,
        qty: qty,
        price: price,
        total: total,
        order_status: orderStatus.BELUM_BAYAR,
        waybill: `order${user_id}-${Date.now()}`,
        payment_method: payment_method,
        expedition_courier: expedition_courier,
    });
    const insert = await orderInsert.save();

    console.log(insert);
    res.status(200).send(insert);
});

// simpan order detail
router.post('/detail', async (req, res) => {
    const {order_id, order_detail} = req.body;
    const order = await Order.findById(order_id).exec();
    let idList = [];
    for (let i = 0; i < order_detail.length; i++) {
        const od = new OrderDetail({
            order: order_id,
            product: order_detail[i].product,
            qty: order_detail[i].qty
        });
        await od.save();
        idList.push(od._id);
    }

    order.order_detail.splice(0, 0, ...idList);
    await order.save();
});

//update data payment
router.post('/:id', async (req, res) => {
    const {payment_status} = req.body;
    const orders = await Order.findByIdAndUpdate(req.params.id, {payment_status: payment_status}, {})
    res.status(200).send({
        'status': true,
        'data': orders
    });
});

//update data ekspedisi
router.post('/status/:id', async (req, res) => {
    const {order_status} = req.body;
    const orders = await Order.findByIdAndUpdate(req.params.id, {order_status: order_status}, {})
    res.status(200).send({
        'status': true,
        'data': orders
    });
});

// update data order (sepertinya tidak dipakai)
router.post('/:id', async (req, res) => {
    res.status(501).send('not implemented');
    // const orders = await Order.findByIdAndUpdate(req.params.id, req.body, {})
    // res.status(200).send({
    //     'status': true,
    //     'data': orders
    // });
});

//hapus data order (sepertinya tidak dipakai)
router.delete('/:id', async (req, res) => {
    res.status(501).send('not implemented');
    // const orders = await Order.findByIdAndDelete(req.params.id, req.body)
    // res.status(200).send({
    //     'status': true,
    //     'data': orders
    // });
});

export default router;export default router;
