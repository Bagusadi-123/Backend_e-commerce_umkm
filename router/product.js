import express from 'express';
import Product from '../model/product.js';

const router = express.Router();

// ambil semua data product (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
});

// buat product baru, register
router.post('/', async (req, res) => {
    const {name, price, desc, product_photo_path} = req.body;
    console.log(req.body);
    const productInsert = new Product({
        name: name,
        price: price,
        desc: desc,
        product_photo_path: product_photo_path
    });
    const insert = await productInsert.save();
    console.log(insert);
    res.status(200).send(insert);
});

// update data product
router.put('/:id', async (req, res) => {
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {})
    res.status(200).send({
        'status': true,
        'data': products
    });
});

router.delete('/:id', async (req, res) => {
    const products = await Product.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': products
    });
});

export default router;