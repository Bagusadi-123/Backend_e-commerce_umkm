import express from 'express';
import Expedition from '../model/expedition.js';

const router = express.Router();

// ambil semua data expedition (untuk admin sepertinya)
router.get('/', async (req, res) => {
    const expeditions = await Expedition.find();
    res.status(200).send(expeditions);
    // res.json(expeditions);
});

// buat expedition baru, register
router.post('/', async (req, res) => { 
    const { name } = req.body;
    console.log(req.body);
    const expeditionInsert = new Expedition({
        name: name
    });
    const insert = await expeditionInsert.save();
    console.log(insert);
    res.status(200).send(insert);
    // res.json(insert);
});

// update data expedition
router.put('/:id', async (req, res) => { 
    const expeditions = await Expedition.findByIdAndUpdate(req.params.id, req.body,{}) 
    res.status(200).send({
        'status': true,
        'data': expeditions
    });
});

router.delete('/:id', async (req, res) => { 
    const expeditions = await Expedition.findByIdAndDelete(req.params.id, req.body) 
    res.status(200).send({
        'status': true,
        'data': expeditions
    });
});

export default router;