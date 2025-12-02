import express from 'express';
import ProductFavorite from '../model/productFavorite.js';

const router = express.Router();

router.get('/id/:id', getFavoritePerUser);
router.post('/', addFavorite);
router.delete('/', removeFavorite);

// ambil favorit per user (id user)
async function getFavoritePerUser(req, res) {
    const productFavorite = await ProductFavorite.find({'user': req.params.id}).populate('product').exec();
    res.status(200).send(productFavorite);
}

// tambah favorit
async function addFavorite(req, res) {
    const {user, product} = req.body;
    const productFavoriteInsert = new ProductFavorite({
        user: user,
        product: product,

    });
    const insert = productFavoriteInsert.save();
    res.status(200).send(insert);
}

// hapus favorit
async function removeFavorite(req, res) {
    const {user, product} = req.body;
    const prod = await ProductFavorite.findOneAndUpdate({'user': user, 'product': product}, {deleted: true}).exec();
    res.status(200).send({
        'status': true,
    });
}

export default router;