const express = require('express');
const router = express.Router();
const prisma = require('../src/lib/prisma');


router.get('/', async (req, res) => {
    try {
        const data = await prisma.detailPeminjaman.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//tambahkan detailPeminjaman
router.post('/', async (req, res) => {
    const { id_transaksi, id_buku, } = req.body;
    try {
        const peminjamanBaru = await prisma.detailPeminjaman.create({
            data: {
                id_transaksi: Number( id_transaksi ),
                id_buku: Number( id_buku )
            }
        });
        return res.status(201).json(peminjamanBaru);
    } catch (error) {
        res.status(500).json({ message: 'Buku atau Transaksi tidak ditemukan!' });
    }
});

//tampilkan detailpeminjaman
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const detailpeminjaman = await prisma.detailPeminjaman.findUnique({
            where: { id_detail: Number(id)},
            include: {
                 transaksi: true,
                 buku: true
                }
        });
        //pengecekan apakah idDetail ada
            if(!detailpeminjaman) {
                return res.status(404).json({ message: `ID${id} tidak ada didatabases!`});
            }
            res.json(detailpeminjaman);
    } catch (error) {
        res.status(500).json({ message: `Terjadi kesalahan pada server!`});
    }
});

//menghapus transaksi
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletepeminjaman = await prisma.detailPeminjaman.delete({
            where: { id_detail: Number(id)}
        });
        res.status(200).json({
            message: `Detail peminjaman dengan ID${id} berhasil dihapus!`,
            data_terhapus: deletepeminjaman
        })
    } catch (error) {
        res.status(500).json({ message: 'Data tidak ditemukan!' })
    }
});

module.exports = router;