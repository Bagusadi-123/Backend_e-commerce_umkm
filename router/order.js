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
router.post('/', async (req, res) => {
    const {store_id, user_id, qty, price, total, payment_method, order_detail} = req.body;
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
    });
    const insert = await orderInsert.save();
    let idList = [];
    for (let i = 0; i < order_detail.length; i++) {
        const od = new OrderDetail({
            order: orderInsert._id,
            product: order_detail[i].product,
            qty: order_detail[i].qty
        });
        await od.save();
        idList.push(od._id);
    }

    orderInsert.order_detail.splice(0, 0, ...idList);
    await orderInsert.save();

    console.log(insert);
    res.status(200).send(insert);
});

// update data order (sepertinya tidak dipakai)
router.put('/:id', async (req, res) => {
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

export default router;