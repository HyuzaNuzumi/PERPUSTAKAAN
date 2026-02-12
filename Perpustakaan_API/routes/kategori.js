const express = require('express');
const router = express.Router();
const PrismaClient = require('../src/lib/prisma');
const prisma = require('../src/lib/prisma');

router.get('/', async (req, res) => {
    try {
        const data = await prisma.kategori.findMany();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req,res) => {
    const { nama_kategori } =req.body;
    try {
        const kategori_baru = await prisma.kategori.create({
            data: { nama_kategori}
        });
        res.status(201).json(kategori_baru);
    }catch (error){
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;