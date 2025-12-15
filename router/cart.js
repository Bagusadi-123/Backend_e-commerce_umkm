import express from 'express';
import Cart from '../model/cart.js';
import ProductFavorite from "../model/productFavorite.js";

const router = express.Router();

// ambil data keranjang per user
router.get('/id/:id', async (req, res) => {
    const cart = await Cart.find({'user': req.params.id}).populate('product').exec();
    res.status(200).send(cart);
});

// tambah data keranjang baru
router.post('/', async (req, res) => {
    const {user, product} = req.body;
    const cartInsert = new Cart({
        user: user,
        product: product,
        qty: 1,
    });
    const insert = await cartInsert.save()
    console.log(insert);
    res.status(200).send(insert);
});

// update data keranjang
router.put('/:id', async (req, res) => {
    const {qty} = req.body;
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
        qty: qty,
    }).exec();
    res.status(200).send({
        'status': true, 'data': cart
    });
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    const users = await Cart.findByIdAndDelete(req.params.id).exec();
    res.status(200).send({
        'status': true,
        'data': users
    });
});

export default router;export default router;
