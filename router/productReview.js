import express from 'express';
import ProductReview from '../model/productReview.js';

const router = express.Router();

// ambil semua data productReview (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const productReviews = await ProductReview.find();
    res.status(200).send(productReviews);
});

// buat productReview baru, register
router.post('/', async (req, res) => {
    const {username, review_text, rating} = req.body;
    console.log(req.body);
    const productReviewInsert = new ProductReview({
        username: username,
        review_text: review_text,
        rating: rating,
    });
    const insert = await productReviewInsert.save();
    console.log(insert);
    res.status(200).send(insert);
});

// update data productReview
router.put('/:id', async (req, res) => {
    const productReviews = await ProductReview.findByIdAndUpdate(req.params.id, req.body, {})
    res.status(200).send({
        'status': true,
        'data': productReviews
    });
});

router.delete('/:id', async (req, res) => {
    const productReviews = await ProductReview.findByIdAndDelete(req.params.id, req.body)
    res.status(200).send({
        'status': true,
        'data': productReviews
    });
});

export default router;