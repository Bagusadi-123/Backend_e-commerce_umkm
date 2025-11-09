import express from 'express';
import ProductFavorite from '../model/productFavorite.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const productFavorite = await ProductFavorite.find();
    res.status(200).send(productFavorite);
});

router.post('/', async (req, res) => {
    const {product, count} = req.body;
    console.log(req.body);

    const productFavoriteInsert = new productFavorite({
        product: product,
        price:  price,

    });
    const insert = productFavoriteInsert.save();
    console.log(insert);
    res.status(200).send(insert);
});

router.delete('/:id', async (req, res) => {
    const productFavorite = await productFavorite.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': productFavorite
    });
});
export default router;