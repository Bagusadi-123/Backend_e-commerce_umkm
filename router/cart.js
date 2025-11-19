import express from 'express';
import Cart from '../model/cart.js';

const router = express.Router();

// ambil semua data user (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const cart = await Cart.find();
    res.status(200).send(cart);
});

// buat data keranjang baru, register
router.post('/', async (req, res) => {
    const { product_id, qty, total } = req.body;
    const cartInsert = new Cart({
        product_id: product_id,
        qty: qty,
        total: total,
    });
    const insert = await cartInsert.save()
    console.log(insert);
    res.status(200).send(insert);
});

// update data user
router.put('/:id', async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body,{})
    res.status(200).send({
        'status': true,
        'data': cart
    });
});

router.delete('/:id', async (req, res) => { 
    const users = await Cart.findByIdAndDelete(req.params.id, req.body) 
    res.status(200).send({
        'status': true,
        'data': users
    });
});

export default router;