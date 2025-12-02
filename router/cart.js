import express from 'express';
import Cart from '../model/cart.js';
import ProductFavorite from "../model/productFavorite.js";

const router = express.Router();

// ambil data keranjang per user
router.get('/id/:id', async (req, res) => {
    const cart = await Cart.find({'user': req.params.id}).populate('product').exec();
    res.status(200).send(cart);
});

// buat data keranjang baru, register
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

// update data user
router.put('/:id', async (req, res) => {
    const {user, product, qty} = req.body;
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
        user: user,
        product: product,
        qty: qty,
    }).exec();
    res.status(200).send({
        'status': true
    });
});

router.delete('/', async (req, res) => {
    const {user, product, qty} = req.body;
    const prod = await ProductFavorite.findOneAndUpdate({'user': user, 'product': product}, {deleted: true}).exec();
    const users = await Cart.findByIdAndDelete({'user': user, 'product': product}, {deleted: true}).exec();
    res.status(200).send({
        'status': true,
        'data': users
    });
});

export default router;