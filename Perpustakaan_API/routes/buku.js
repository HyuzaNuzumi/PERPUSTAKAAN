const express = require('express');
const router = express.Router();
const prisma = require('../src/lib/prisma')

//ambil semua buku (beserta info kategori)
router.get('/', async(req,res) => {
    try {
        const data = await prisma.buku.findMany({
            include: { kategori: true } //include untuk relasi
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//tambah buku
router.post('/', async (req, res) => {
    const {judul, penulis, penerbit, id_kategori, status} = req.body;
    try {
        const bukuBaru = await prisma.buku.create({
            data: { 
            judul: judul, 
            penulis: penulis,
            penerbit: penerbit,
            id_kategori: Number(id_kategori),
            status: status
        } 
        });
        return res.status(201).json(bukuBaru);
    } catch(error) {
        console.error("DEBUG ERROR", error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });
        }
    }
});

// tampilkan buku
router.get('id', async (req, res) => {
    const { id } = req.params;
    try {
        const buku = await prisma.buku.findUnique({
            where : { id_buku: Number(id) },
            include : { kategori: true } 
        });
        
        if(!buku) {
            return res.status(404).json({ message: 'Buku tidak ditemukn!'});
        }
        res.json(buku);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
});

//update buku 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { judul, penulis, penerbit, tahun_terbit, id_kategori, status } = req.body;
    try {
        const updateBuku = await prisma.buku.update({
            where : { id_buku: Number(id) },
            data: {
                judul,
                penulis,
                penerbit,
                tahun_terbit: tahun_terbit ? parseInt(tahun_terbit) : null,
                id_kategori: Number(id_kategori), status
            }
        });
        res.json(updateBuku)
    } catch (error) {
        res.status(400).json({error: error.message })
    }
});

// delete buku 
router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        await prisma.buku.delete({
            where: { id_buku: Number(id)}
        });
        res.json({ message: `Buku dengan ID ${id} berhasil dihapus!`});
    } catch (error) {
        res.status(404).json({ error: error.message})
    }
});


module.exports = router;