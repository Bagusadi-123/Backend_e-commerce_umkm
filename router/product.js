import express from 'express';
import {processImage, uploadHandler} from "../util/imageUtil.js";
import Product from "../model/product.js";

const router = express.Router();

router.get('/', getAllProduct);
router.get('/total', getTotalProduct);
router.get('/page/:page', getDataPerPage);
router.get('/id/:id', getProduct);
router.post('/', uploadHandler, addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// ambil semua data product (untuk admin sepertinya)
async function getAllProduct(req, res) {
    const products = await Product.find().populate('store');
    res.status(200).send(products);
}

// ambil jumlah total produk
async function getTotalProduct(req, res) {
    const total = await Product.paginate(
        {deleted: 'false'},
        {page: 1, limit: 10, populate: 'store'}
    );
    res.status(200).send({'status': true, 'data': total});
}

// ambil data product per page (pagination, 1-15, 16-30, 31-45, dsb)
async function getDataPerPage(req, res) {
    const {page} = req.params.page;
    const prodPaginate = await Product.paginate({deleted: false}, {page: page, limit: 10, populate: 'store'});
    res.status(200).send(prodPaginate['docs']);
}

// ambil satu produk
async function getProduct(req, res) {
    const prod = await Product.where({_id: req.params.id, deleted: 'false'}).populate('store').exec();
    res.status(200).send({'status': true, 'data': prod[0]});
}

// buat product baru
async function addProduct(req, res) {
    const {store_id, name, price, desc, stock} = req.body;
    if (!req.file) {
        return res.status(400).json({error: "Photo is required"});
    }
    const finalName = req.file.filename.replace(/\.[^/.]+$/, ".jpg");
    const webPath = await processImage("product", req.file.path, finalName);
    console.log(store_id);
    const productInsert = new Product({
        store: store_id,
        name: name,
        price: price,
        desc: desc,
        product_photo_path: webPath,
        stock: stock
    });
    const insert = await productInsert.save();
    console.log(insert);
    res.status(200).send(insert);
}

// update data product
async function updateProduct(req, res) {
    const {store, name, price, desc, product_photo_path, stock} = req.body;
    const products = await Product.findByIdAndUpdate(req.params.id, {
        store: store,
        name: name,
        price: price,
        desc: desc,
        product_photo_path: product_photo_path,
        stock: stock,
        updated_at: Date.now(),
    }).exec();
    res.status(200).send({
        'status': true
    });
}

//hapus produk
async function deleteProduct(req, res) {
    const products = await Product.findByIdAndUpdate(req.params.id, {deleted: true}).exec();
    res.status(200).send({
        'status': true
    });
}

export default router;
