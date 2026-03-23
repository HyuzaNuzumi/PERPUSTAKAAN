const express = require('express');
const router = express.Router();
const prisma = require('../src/lib/prisma');


router.get('/', async (req, res) => {
    try {
        const data = await prisma.transaksi.findMany();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//tambahkan transaksi
router.post('/', async (req, res) => {
    const { id_anggota, id_petugas, tanggal_status_tempo, status } = req.body;
    try {
        const transaksi_baru = await prisma.transaksi.create({
            data: {
            id_anggota: Number(id_anggota),
            id_petugas: Number(id_petugas),
            tanggal_status_tempo: new Date(tanggal_status_tempo),
            status: (status)
            }
        });
        res.status(201).json(transaksi_baru);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

//tampilkan transaksi
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const transaksi = await prisma.transaksi.findUnique({
            where: { id_transaksi: Number(id) },
        });
        if(!transaksi) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan!'})
        }
        res.json(transaksi)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
});

//tampilkan transaksi berdasarkan pinjam
router.get('/status/:status', async (req, res) => {
    const { status} = req.params;
    try {
        const transaksi = await prisma.transaksi.findMany({
            where: { status: status },
        });
        if(!transaksi) {
            return res.status(404).json({ message: 'Transaksi Peminjaman tidak ditemukan!'})
        }
        res.json(transaksi)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
});


//delete transaksi
router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        await prisma.transaksi.delete({
            where: {id_transaksi: Number(id)}
        });
        return res.status(200).json({ message: `Transaksi dengan ID ${id} berhasil dihapus!`})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});